// middleware/authMiddleware.js
// Dijalankan SEBELUM controller pada setiap route yang butuh login.
// Tugasnya: baca token JWT dari header, verifikasi, lalu sisipkan data user
// ke req.user agar controller bisa tahu siapa yang sedang meminta.

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Token dikirim di header: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Akses ditolak: token tidak ada' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi signature token menggunakan JWT_SECRET di .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, iat, exp }
    next();             // lanjut ke controller
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa' });
  }
};

module.exports = { protect };
