// routes/episodeRoutes.js
// Endpoint untuk operasi langsung pada episode (bukan via /films/:id/episodes).
// POST & DELETE hanya untuk admin.
// GET detail episode (beserta navigasi prev/next) bisa diakses siapa saja.

const express       = require('express');
const router        = express.Router();
const ctrl          = require('../controllers/episodeController');
const { protect }   = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// POST /api/episodes             → tambah episode baru (Admin only)
router.post('/', protect, adminOnly, ctrl.create);

// GET  /api/episodes/:id         → detail episode + navigasi prev/next (publik)
router.get('/:id', ctrl.getById);

// PUT  /api/episodes/:id         → update episode (Admin only)
router.put('/:id', protect, adminOnly, ctrl.update);

// DELETE /api/episodes/:id       → hapus episode (Admin only)
router.delete('/:id', protect, adminOnly, ctrl.remove);

module.exports = router;
