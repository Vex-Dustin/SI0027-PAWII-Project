// controllers/ratingController.js
// Menangani fitur "Rating" dari komunitas.
//
// Logika penting:
//   - Setiap user hanya boleh punya SATU rating per film (upsert)
//   - Setiap kali ada rating baru/diubah, rata-rata rating film dihitung ulang
//     menggunakan MongoDB Aggregation Pipeline ($avg) dan disimpan ke Film.averageRating

const Rating = require('../models/Rating');
const Film   = require('../models/Film');

// ── Helper: hitung ulang dan simpan rata-rata rating sebuah film ──────────────
const recalcAverageRating = async (filmId) => {
  const result = await Rating.aggregate([
    { $match: { filmId: new require('mongoose').Types.ObjectId(filmId) } },
    { $group: { _id: '$filmId', avg: { $avg: '$score' }, count: { $sum: 1 } } },
  ]);

  const averageRating = result.length > 0
    ? Math.round(result[0].avg * 10) / 10  // bulatkan ke 1 desimal
    : 0;

  await Film.findByIdAndUpdate(filmId, { averageRating });
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/ratings
// Body: { filmId, score }
// Menggunakan upsert: buat baru jika belum ada, update jika sudah pernah rating
// ─────────────────────────────────────────────────────────────────────────────
exports.rate = async (req, res) => {
  try {
    const { filmId, score } = req.body;

    const rating = await Rating.findOneAndUpdate(
      { userId: req.user.id, filmId },  // cari berdasarkan user + film
      { score },                         // nilai yang diset
      { new: true, upsert: true, runValidators: true }
        // upsert:true → buat dokumen baru jika tidak ditemukan
    );

    // Hitung ulang rata-rata setelah rating baru masuk
    await recalcAverageRating(filmId);

    res.status(201).json({ message: 'Rating berhasil disimpan', data: rating });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/films/:filmId/ratings
// Ambil semua rating sebuah film beserta rata-ratanya.
// averageRating diambil dari dokumen Film (sudah dihitung ulang tiap ada rating baru).
// ─────────────────────────────────────────────────────────────────────────────
exports.getByFilm = async (req, res) => {
  try {
    const film    = await Film.findById(req.params.filmId).select('averageRating title');
    if (!film) return res.status(404).json({ message: 'Film tidak ditemukan' });

    const ratings = await Rating
      .find({ filmId: req.params.filmId })
      .populate('userId', 'username');

    res.status(200).json({
      film:          film.title,
      averageScore:  film.averageRating,
      totalRatings:  ratings.length,
      data:          ratings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
