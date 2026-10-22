// routes/ratingRoutes.js
// POST rating butuh login.
// GET rating (average + list) bersifat publik — siapa saja bisa lihat rating film.

const express     = require('express');
const router      = express.Router();
const ctrl        = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/ratings   → beri atau update rating film (login wajib)
router.post('/', protect, ctrl.rate);

// Catatan: GET /api/films/:filmId/ratings didaftarkan di filmRoutes.js

module.exports = router;
