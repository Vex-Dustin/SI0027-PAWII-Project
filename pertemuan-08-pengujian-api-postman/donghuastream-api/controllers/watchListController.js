// controllers/watchListController.js
// Menangani fitur "List Film (Watching List)":
//   - Tambah film ke daftar tonton
//   - Lihat daftar film milik user yang login
//   - Update status kemajuan (plan_to_watch → watching → completed)
//   - Hapus film dari daftar

const WatchList = require('../models/WatchList');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/watchlist
// Body: { filmId, status? }
// userId diambil dari req.user (hasil dekode token oleh authMiddleware)
// ─────────────────────────────────────────────────────────────────────────────
exports.add = async (req, res) => {
  try {
    const { filmId, status } = req.body;

    const item = await WatchList.create({
      userId: req.user.id, // dari token — user tidak perlu kirim userId sendiri
      filmId,
      status,
    });

    res.status(201).json({ message: 'Film ditambahkan ke watchlist', data: item });
  } catch (err) {
    // Error code 11000 = unique index violation → film sudah ada di watchlist
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Film ini sudah ada di watchlist Anda' });
    }
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/watchlist
// Ambil seluruh watchlist milik user yang sedang login.
// filmId di-populate agar response langsung berisi judul & cover film.
// ─────────────────────────────────────────────────────────────────────────────
exports.getMyList = async (req, res) => {
  try {
    const list = await WatchList
      .find({ userId: req.user.id })
      .populate('filmId', 'title coverImage status genre averageRating')
      .sort({ updatedAt: -1 }); // film yang terakhir diupdate muncul di atas

    res.status(200).json({ data: list, total: list.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/watchlist/:id
// Body: { status }  — hanya field status yang boleh diubah
// Hanya bisa mengubah item milik user sendiri (userId harus cocok)
// ─────────────────────────────────────────────────────────────────────────────
exports.updateStatus = async (req, res) => {
  try {
    const item = await WatchList.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // filter: milik user ini
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Item tidak ditemukan atau bukan milik Anda' });
    }

    res.status(200).json({ message: 'Status watchlist diperbarui', data: item });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/watchlist/:id
// Hanya bisa menghapus item milik user sendiri
// ─────────────────────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    const item = await WatchList.findOneAndDelete({
      _id:    req.params.id,
      userId: req.user.id, // proteksi: tidak bisa hapus milik orang lain
    });

    if (!item) {
      return res.status(404).json({ message: 'Item tidak ditemukan atau bukan milik Anda' });
    }

    res.status(200).json({ message: 'Film dihapus dari watchlist' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
