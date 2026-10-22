// routes/authRoutes.js
// Endpoint autentikasi — tidak butuh middleware protect (belum login).

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/authController');

// POST /api/auth/register  → daftarkan user baru
router.post('/register', ctrl.register);

// POST /api/auth/login     → login & dapatkan JWT token
router.post('/login', ctrl.login);

module.exports = router;
