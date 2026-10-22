// models/Episode.js
// Schema untuk setiap episode dari sebuah film/donghua.
// Kunci fitur navigasi prev/next ada di field episodeNumber.

const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema(
  {
    filmId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Film',         // relasi ke koleksi Film
      required: [true, 'filmId wajib diisi'],
    },
    episodeNumber: {
      type:     Number,
      required: [true, 'Nomor episode wajib diisi'],
    },
    title: {
      type:     String,
      required: [true, 'Judul episode wajib diisi'],
      trim:     true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type:     String,
      required: [true, 'URL video wajib diisi'],
    },
    duration: {
      type:    Number,  // durasi dalam detik, contoh: 1440 = 24 menit
      default: 0,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

// Index compound: pastikan tidak ada dua episode dengan nomor sama dalam satu film.
// Sekaligus mempercepat query "ambil daftar episode film X diurutkan"
episodeSchema.index({ filmId: 1, episodeNumber: 1 }, { unique: true });

module.exports = mongoose.model('Episode', episodeSchema);
