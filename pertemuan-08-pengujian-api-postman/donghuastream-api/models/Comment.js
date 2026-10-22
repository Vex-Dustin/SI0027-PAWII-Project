// models/Comment.js
// Schema untuk komentar komunitas pada sebuah film.
// Field isEdited ditandai true jika user pernah mengubah isi komentar.

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
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
    content: {
      type:      String,
      required:  [true, 'Isi komentar wajib diisi'],
      trim:      true,
      maxlength: [1000, 'Komentar maksimal 1000 karakter'],
    },
    isEdited: {
      type:    Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt dipakai untuk sorting komentar terbaru
);

module.exports = mongoose.model('Comment', commentSchema);
