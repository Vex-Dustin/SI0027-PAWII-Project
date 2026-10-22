// routes/filmRoutes.js
// Endpoint film. GET bersifat publik.
// POST, PUT, DELETE butuh login + role admin.
// Route /api/films/:filmId/episodes, /ratings, /comments "menumpang" di sini
// agar URL-nya semantis (resource bersarang di bawah film).

const express       = require('express');
const router        = express.Router();
const filmCtrl      = require('../controllers/filmController');
const episodeCtrl   = require('../controllers/episodeController');
const ratingCtrl    = require('../controllers/ratingController');
const commentCtrl   = require('../controllers/commentController');
const { protect }   = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

// ── Film CRUD ─────────────────────────────────────────────────────────────────
router.get('/',    filmCtrl.getAll);                       // GET  /api/films
router.get('/:id', filmCtrl.getById);                      // GET  /api/films/:id
router.post('/',   protect, adminOnly, filmCtrl.create);   // POST /api/films
router.put('/:id', protect, adminOnly, filmCtrl.update);   // PUT  /api/films/:id
router.delete('/:id', protect, adminOnly, filmCtrl.remove);// DELETE /api/films/:id

// ── Sub-resource: Daftar Episode milik Film ───────────────────────────────────
// GET /api/films/:filmId/episodes → list episode berurutan
router.get('/:filmId/episodes', episodeCtrl.getByFilm);

// ── Sub-resource: Rating Film ─────────────────────────────────────────────────
// GET /api/films/:filmId/ratings → average + daftar rating
router.get('/:filmId/ratings', ratingCtrl.getByFilm);

// ── Sub-resource: Komentar Film ───────────────────────────────────────────────
// GET /api/films/:filmId/comments → daftar komentar film tsb
router.get('/:filmId/comments', commentCtrl.getByFilm);

module.exports = router;
