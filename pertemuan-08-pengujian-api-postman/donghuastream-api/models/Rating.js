// models/Rating.js
// Schema untuk rating film oleh user (skala 1–10).
// Setiap user hanya boleh memberi SATU rating per film (bisa diupdate).

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
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
    score: {
      type:     Number,
      required: [true, 'Score wajib diisi'],
      min:      [1, 'Score minimal 1'],
      max:      [10, 'Score maksimal 10'],
    },
  },
  { timestamps: true }
);

// Constraint: satu user → satu rating per film
ratingSchema.index({ userId: 1, filmId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
