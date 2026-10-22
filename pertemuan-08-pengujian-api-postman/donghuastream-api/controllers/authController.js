// controllers/authController.js
// Menangani registrasi dan login user.
// Setelah login berhasil, server mengembalikan JWT token yang dipakai
// untuk mengakses route-route yang butuh autentikasi.

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ── Helper: buat token JWT ────────────────────────────────────────────────────
const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },  // payload yang disimpan di dalam token
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/register
// Body: { username, email, password, role? }
// ─────────────────────────────────────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Cek apakah email sudah terdaftar
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    // Buat user baru — password akan di-hash otomatis oleh pre-save hook di model
    const user = await User.create({ username, email, password, role });

    // Jangan kirim field password meskipun ada di response
    user.password = undefined;

    res.status(201).json({
      message: 'Registrasi berhasil',
      data: user,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { email, password }
// ─────────────────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    // Cari user — tambahkan .select('+password') karena field password di-hide by default
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Bandingkan password input dengan hash di database (method dari model)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const token = signToken(user);
    user.password = undefined; // pastikan hash tidak ikut dikirim

    res.status(200).json({
      message: 'Login berhasil',
      token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
