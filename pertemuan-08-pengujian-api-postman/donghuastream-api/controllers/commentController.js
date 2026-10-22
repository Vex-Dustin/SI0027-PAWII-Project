// controllers/commentController.js
// Menangani fitur "Comment" dari komunitas:
//   - Tulis komentar baru pada sebuah film
//   - Lihat semua komentar film (terbaru di atas)
//   - Edit komentar (hanya pemilik komentar)
//   - Hapus komentar (pemilik komentar ATAU admin)

const Comment = require('../models/Comment');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/comments
// Body: { filmId, content }
// ─────────────────────────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    const { filmId, content } = req.body;

    const comment = await Comment.create({
      userId: req.user.id, // dari token — tidak dari body
      filmId,
      content,
    });

    res.status(201).json({ message: 'Komentar berhasil ditulis', data: comment });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/films/:filmId/comments
// Ambil semua komentar sebuah film, terbaru di atas.
// userId di-populate agar nama user tampil di response.
// ─────────────────────────────────────────────────────────────────────────────
exports.getByFilm = async (req, res) => {
  try {
    const comments = await Comment
      .find({ filmId: req.params.filmId })
      .sort({ createdAt: -1 })                 // komentar terbaru muncul duluan
      .populate('userId', 'username');          // ambil username dari koleksi User

    res.status(200).json({ data: comments, total: comments.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/comments/:id
// Body: { content }
// Hanya pemilik komentar (userId === req.user.id) yang boleh mengedit.
// isEdited otomatis di-set true sebagai penanda komentar sudah diubah.
// ─────────────────────────────────────────────────────────────────────────────
exports.update = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // pastikan milik user ini
      { content: req.body.content, isEdited: true },
      { new: true, runValidators: true }
    );

    if (!comment) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan atau bukan milik Anda' });
    }

    res.status(200).json({ message: 'Komentar berhasil diperbarui', data: comment });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/comments/:id
// - Admin: bisa hapus komentar siapa saja (moderasi konten)
// - User biasa: hanya bisa hapus komentar miliknya sendiri
// ─────────────────────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    // Admin tidak dibatasi oleh userId, user biasa hanya bisa hapus miliknya
    const filter = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, userId: req.user.id };

    const comment = await Comment.findOneAndDelete(filter);

    if (!comment) {
      return res.status(404).json({ message: 'Komentar tidak ditemukan atau bukan milik Anda' });
    }

    res.status(200).json({ message: 'Komentar berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
