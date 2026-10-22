// controllers/episodeController.js
// Menangani CRUD episode dan FITUR UTAMA: navigasi antar episode (prev/next).
//
// Alur navigasi:
//   User klik episode ke-5 → getById dipanggil dengan episodeId ep-5
//   → Controller cari episode dengan episodeNumber (5-1) dan (5+1) dalam film yang sama
//   → Response sertakan data prevEpisode & nextEpisode
//   → Frontend pakai data ini untuk render tombol "Episode Sebelumnya" / "Episode Berikutnya"

const Episode = require('../models/Episode');
const Film    = require('../models/Film');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/episodes  (Admin only)
// Body: { filmId, episodeNumber, title, description, videoUrl, duration, thumbnail }
// ─────────────────────────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    // Pastikan film-nya ada sebelum membuat episode
    const filmExists = await Film.findById(req.body.filmId);
    if (!filmExists) {
      return res.status(404).json({ message: 'Film tidak ditemukan' });
    }

    const episode = await Episode.create(req.body);
    res.status(201).json({ message: 'Episode berhasil ditambahkan', data: episode });
  } catch (err) {
    // Kode 11000 = duplicate key (episodeNumber sudah ada untuk film tersebut)
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Nomor episode sudah ada untuk film ini' });
    }
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/films/:filmId/episodes
// Ambil DAFTAR semua episode dari sebuah film, diurutkan berdasarkan nomor episode.
// ─────────────────────────────────────────────────────────────────────────────
exports.getByFilm = async (req, res) => {
  try {
    const episodes = await Episode
      .find({ filmId: req.params.filmId })
      .sort({ episodeNumber: 1 }) // ascending: ep 1, 2, 3, ...
      .select('episodeNumber title thumbnail duration'); // hanya ambil field yang diperlukan list

    res.status(200).json({ data: episodes, total: episodes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/episodes/:id
// Ambil DETAIL satu episode beserta navigasi prev/next.
// Ini adalah inti dari "fitur navigasi antar episode yang baik".
// ─────────────────────────────────────────────────────────────────────────────
exports.getById = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id).populate('filmId', 'title coverImage');
    if (!episode) return res.status(404).json({ message: 'Episode tidak ditemukan' });

    // Jalankan dua query pencarian prev & next secara paralel dengan Promise.all
    // → lebih efisien daripada menjalankan berurutan (mengurangi waktu tunggu)
    const [prevEpisode, nextEpisode] = await Promise.all([
      Episode.findOne({
        filmId:        episode.filmId,
        episodeNumber: episode.episodeNumber - 1,   // nomor persis satu di bawah
      }).select('_id episodeNumber title thumbnail'),

      Episode.findOne({
        filmId:        episode.filmId,
        episodeNumber: episode.episodeNumber + 1,   // nomor persis satu di atas
      }).select('_id episodeNumber title thumbnail'),
    ]);

    // prevEpisode / nextEpisode akan bernilai null kalau tidak ada (ep pertama/terakhir)
    res.status(200).json({
      data:        episode,
      prevEpisode: prevEpisode || null,
      nextEpisode: nextEpisode || null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/episodes/:id  (Admin only)
// Body: field episode yang ingin diubah
// ─────────────────────────────────────────────────────────────────────────────
exports.update = async (req, res) => {
  try {
    const episode = await Episode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!episode) return res.status(404).json({ message: 'Episode tidak ditemukan' });

    res.status(200).json({ message: 'Episode berhasil diperbarui', data: episode });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/episodes/:id  (Admin only)
// ─────────────────────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    const episode = await Episode.findByIdAndDelete(req.params.id);
    if (!episode) return res.status(404).json({ message: 'Episode tidak ditemukan' });

    res.status(200).json({ message: 'Episode berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
