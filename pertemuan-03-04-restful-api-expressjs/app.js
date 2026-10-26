require('dotenv').config(); // Wajib berada di baris paling atas
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Memaksa Node.js memakai Google & Cloudflare DNS
const express = require('express');
const mongoose = require('mongoose');
const donghuaRoutes = require('./routes/donghuaRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

// Menggunakan Connection String MongoDB Atlas dari file .env
const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Berhasil terhubung ke MongoDB Atlas (db_donghua)'))
    .catch((err) => console.error('Gagal terhubung ke MongoDB Atlas:', err.message));

// Routes Utama
app.use('/donghua', donghuaRoutes);

// Handler untuk Endpoint 404
app.use((req, res, next) => {
    const error = new Error(`Endpoint ${req.originalUrl} tidak ditemukan`);
    error.statusCode = 404;
    next(error);
});

// Global Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});