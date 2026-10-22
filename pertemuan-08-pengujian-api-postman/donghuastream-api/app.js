// app.js  — Entry Point aplikasi
// Menghubungkan semua layer: config, middleware global, dan routes.

require('dotenv').config();
const express   = require('express');
const connectDB = require('./config/db');

const app = express();

// ── Koneksi Database ──────────────────────────────────────────────────────────
connectDB();

// ── Middleware Global ─────────────────────────────────────────────────────────
app.use(express.json()); // parsing body JSON dari setiap request

// ── Mount Routes ──────────────────────────────────────────────────────────────
// Setiap fitur punya prefix URL-nya sendiri agar endpoint terorganisir rapi.
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/films',     require('./routes/filmRoutes'));
app.use('/api/episodes',  require('./routes/episodeRoutes'));
app.use('/api/watchlist', require('./routes/watchListRoutes'));
app.use('/api/history',   require('./routes/historyRoutes'));
app.use('/api/ratings',   require('./routes/ratingRoutes'));
app.use('/api/comments',  require('./routes/commentRoutes'));

// ── Jalankan Server ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server DonghuaStream berjalan di http://localhost:${PORT}`);
});
