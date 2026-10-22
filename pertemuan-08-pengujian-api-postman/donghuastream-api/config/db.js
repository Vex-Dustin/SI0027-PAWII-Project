// config/db.js
// Bertanggung jawab HANYA untuk membuka koneksi ke MongoDB.
// Dipanggil satu kali di app.js saat server pertama kali dijalankan.

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB terhubung: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Gagal konek MongoDB: ${err.message}`);
    process.exit(1); // hentikan proses jika DB tidak bisa konek
  }
};

module.exports = connectDB;
