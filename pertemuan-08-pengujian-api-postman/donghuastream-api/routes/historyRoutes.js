// routes/historyRoutes.js
// Semua endpoint history butuh login.
// User hanya mengakses history miliknya sendiri.

const express     = require('express');
const router      = express.Router();
const ctrl        = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

// POST   /api/history       → catat episode yang baru ditonton
router.post('/', protect, ctrl.record);

// GET    /api/history       → lihat riwayat tonton saya (terbaru duluan)
router.get('/', protect, ctrl.getMyHistory);

// DELETE /api/history/:id   → hapus satu entri riwayat
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
