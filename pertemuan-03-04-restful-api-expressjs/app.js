// Mini Project - RESTful API CRUD dengan Express.js
// Entitas: Donghua (id, judul, rilis, episode, genre)
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();

app.use(express.json());

// Mengambil router donghua
const donghuaRoutes = require('./routes/donghuaRoutes');

// Menggunakan prefix /donghua untuk semua rute Donghua
app.use('/donghua', donghuaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});