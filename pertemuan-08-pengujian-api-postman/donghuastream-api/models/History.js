// models/History.js
// Schema untuk fitur "List History" — rekam jejak episode yang sudah ditonton user.
// Menyimpan progress (berapa detik yang sudah ditonton) untuk fitur "lanjut nonton".

const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
    },
    filmId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Film',
      required: true,
    },
    episodeId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Episode',
      required: true,
    },
    // Berapa detik yang sudah berhasil ditonton user
    watchedDuration: {
      type:    Number,
      default: 0,
    },
    // Total durasi episode (disimpan di sini agar bisa hitung persentase tanpa query lagi)
    totalDuration: {
      type:    Number,
      default: 0,
    },
    watchedAt: {
      type:    Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index untuk query "ambil history user X, terbaru duluan" — query yang paling sering dipanggil
historySchema.index({ userId: 1, watchedAt: -1 });

module.exports = mongoose.model('History', historySchema);
