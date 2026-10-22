// middleware/roleMiddleware.js
// Dijalankan SETELAH authMiddleware (req.user sudah ada).
// Memastikan hanya user dengan role 'admin' yang bisa mengakses suatu route.

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak: hanya admin yang diizinkan' });
  }
  next();
};

module.exports = { adminOnly };
