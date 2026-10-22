// controllers/filmController.js
// CRUD untuk data film. Endpoint GET bisa diakses siapa saja (publik).
// POST, PUT, DELETE hanya untuk admin (dijaga oleh middleware di routes).

const Film = require('../models/Film');

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/films?genre=Action&status=ongoing&search=battle&page=1&limit=10
// Mendukung filter, pencarian teks, dan pagination
// ─────────────────────────────────────────────────────────────────────────────
exports.getAll = async (req, res) => {
  try {
    const { genre, status, search, page = 1, limit = 10 } = req.query;

    // Bangun filter secara dinamis sesuai query yang dikirim
    const filter = {};
    if (genre)  filter.genre  = genre;
    if (status) filter.status = status;
    if (search) filter.$text  = { $search: search }; // memanfaatkan text index

    const skip  = (Number(page) - 1) * Number(limit);
    const films = await Film.find(filter).skip(skip).limit(Number(limit));
    const total = await Film.countDocuments(filter);

    res.status(200).json({ data: films, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/films/:id
// ─────────────────────────────────────────────────────────────────────────────
exports.getById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film tidak ditemukan' });

    res.status(200).json({ data: film });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/films  (Admin only)
// Body: { title, description, genre, status, totalEpisodes, releaseYear, studio, coverImage }
// ─────────────────────────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    const film = await Film.create(req.body);
    res.status(201).json({ message: 'Film berhasil ditambahkan', data: film });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/films/:id  (Admin only)
// Body: field yang ingin diubah (tidak harus semua)
// ─────────────────────────────────────────────────────────────────────────────
exports.update = async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // kembalikan dokumen setelah update
    );
    if (!film) return res.status(404).json({ message: 'Film tidak ditemukan' });

    res.status(200).json({ message: 'Film berhasil diperbarui', data: film });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/films/:id  (Admin only)
// ─────────────────────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film tidak ditemukan' });

    res.status(200).json({ message: 'Film berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
