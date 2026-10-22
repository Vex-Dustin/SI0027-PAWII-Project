// controllers/historyController.js
// Menangani fitur "List History":
//   - Mencatat episode yang baru ditonton (termasuk progress detik)
//   - Mengambil seluruh riwayat tonton user, diurutkan terbaru
//   - Menghapus satu entri riwayat

const History = require('../models/History');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/history
// Dipanggil setiap kali user selesai/berhenti menonton sebuah episode.
// Body: { filmId, episodeId, watchedDuration, totalDuration }
// ─────────────────────────────────────────────────────────────────────────────
exports.record = async (req, res) => {
  try {
    const { filmId, episodeId, watchedDuration, totalDuration } = req.body;

    const history = await History.create({
      userId: req.user.id, // dari token JWT, bukan dari body
      filmId,
      episodeId,
      watchedDuration,
      totalDuration,
      watchedAt: new Date(),
    });

    res.status(201).json({ message: 'History tonton dicatat', data: history });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/history
// Ambil semua riwayat tonton milik user yang login.
// Diurutkan dari yang paling baru (watchedAt: -1) → cocok untuk tampilan "Lanjut Nonton".
// filmId & episodeId di-populate supaya response langsung readable.
// ─────────────────────────────────────────────────────────────────────────────
exports.getMyHistory = async (req, res) => {
  try {
    const history = await History
      .find({ userId: req.user.id })
      .sort({ watchedAt: -1 })                                      // terbaru di atas
      .populate('filmId',    'title coverImage')                    // ambil judul & cover film
      .populate('episodeId', 'episodeNumber title duration');       // ambil info episode

    res.status(200).json({ data: history, total: history.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/history/:id
// Hapus satu entri history milik user sendiri.
// ─────────────────────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    const item = await History.findOneAndDelete({
      _id:    req.params.id,
      userId: req.user.id,
    });

    if (!item) {
      return res.status(404).json({ message: 'History tidak ditemukan atau bukan milik Anda' });
    }

    res.status(200).json({ message: 'History berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
