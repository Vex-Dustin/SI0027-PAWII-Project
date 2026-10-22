// models/Film.js
// Schema untuk data Film/Donghua yang ditampilkan di platform.

const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Judul film wajib diisi'],
      trim:     true,
    },
    description: {
      type: String,
      trim: true,
    },
    genre: {
      // Array string, contoh: ['Action', 'Fantasy', 'Cultivation']
      type: [String],
    },
    status: {
      type:    String,
      enum:    ['ongoing', 'completed'],
      default: 'ongoing',
    },
    totalEpisodes: {
      type:    Number,
      default: 0,
    },
    releaseYear: {
      type: Number,
    },
    studio: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String, // URL gambar cover
    },
    averageRating: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true } // otomatis tambah createdAt & updatedAt
);

// Index teks untuk fitur pencarian judul + filter genre & status
// → mengurangi beban query saat banyak user aktif bersamaan
filmSchema.index({ title: 'text' });
filmSchema.index({ genre: 1, status: 1 });

module.exports = mongoose.model('Film', filmSchema);
