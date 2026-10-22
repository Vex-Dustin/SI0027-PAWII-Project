// routes/commentRoutes.js
// POST dan PUT butuh login.
// DELETE bisa dilakukan oleh pemilik komentar atau admin (logika ada di controller).
// GET komentar film didaftarkan di filmRoutes.js (sub-resource pattern).

const express     = require('express');
const router      = express.Router();
const ctrl        = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// POST   /api/comments       → tulis komentar baru (login wajib)
router.post('/', protect, ctrl.create);

// PUT    /api/comments/:id   → edit komentar (hanya pemilik)
router.put('/:id', protect, ctrl.update);

// DELETE /api/comments/:id   → hapus komentar (pemilik atau admin)
router.delete('/:id', protect, ctrl.remove);

// Catatan: GET /api/films/:filmId/comments didaftarkan di filmRoutes.js

module.exports = router;
