// routes/watchListRoutes.js
// Semua endpoint watchlist butuh login (protect).
// User hanya bisa mengakses & memodifikasi watchlist miliknya sendiri
// (penjagaan dilakukan di controller dengan filter userId: req.user.id).

const express     = require('express');
const router      = express.Router();
const ctrl        = require('../controllers/watchListController');
const { protect } = require('../middleware/authMiddleware');

// POST   /api/watchlist       → tambah film ke watchlist
router.post('/', protect, ctrl.add);

// GET    /api/watchlist       → lihat watchlist saya
router.get('/', protect, ctrl.getMyList);

// PATCH  /api/watchlist/:id   → update status (plan_to_watch/watching/completed/dropped)
router.patch('/:id', protect, ctrl.updateStatus);

// DELETE /api/watchlist/:id   → hapus film dari watchlist
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
