// Mini Project - Pertemuan 9-10: Koneksi MongoDB & Routing
// TODO 4: lengkapi koneksi Mongoose dan pemasangan route di bawah ini.
// Jalankan dengan: npm install && npm start (setelah menyalin .env.example menjadi .env)
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Memaksa Node.js menggunakan DNS Google & Cloudflare 

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
const prodiRoutes = require("./routes/prodiRoutes");

app.use(express.json());

// TODO: app.use('/mahasiswa', mahasiswaRoutes);
// TODO: app.use('/prodi', prodiRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
     console.log('Terhubung ke MongoDB Atlas'); 
     app.listen(PORT, () => {
       console.log(`Server berjalan di port ${PORT}`);
     });
   })
  .catch((err) => console.error('Gagal terhubung:', err.message));