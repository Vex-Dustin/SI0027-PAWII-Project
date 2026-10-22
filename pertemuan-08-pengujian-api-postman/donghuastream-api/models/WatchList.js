// models/WatchList.js
// Schema untuk fitur "List Film" — daftar film yang ingin/sedang/sudah ditonton user.
// Status mencerminkan tahap: plan_to_watch → watching → completed (atau dropped).

const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema(
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
    status: {
      type:    String,
      enum:    ['plan_to_watch', 'watching', 'completed', 'dropped'],
      default: 'plan_to_watch',
    },
  },
  { timestamps: true }
);

// Satu user hanya boleh punya SATU entri per film di watchlist-nya.
// Constraint ini dijaga di level database, bukan hanya aplikasi.
watchListSchema.index({ userId: 1, filmId: 1 }, { unique: true });

module.exports = mongoose.model('WatchList', watchListSchema);
