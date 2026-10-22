// models/User.js
// Schema untuk akun pengguna: Community, Admin, Film Enjoyer.
// Password di-hash dengan bcrypt sebelum disimpan ke DB.

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type:     String,
      required: [true, 'Username wajib diisi'],
      unique:   true,
      trim:     true,
    },
    email: {
      type:     String,
      required: [true, 'Email wajib diisi'],
      unique:   true,
      lowercase: true,
      trim:     true,
    },
    password: {
      type:     String,
      required: [true, 'Password wajib diisi'],
      minlength: 6,
      // select: false → password TIDAK ikut terkirim di response query biasa
      select:   false,
    },
    role: {
      type:    String,
      enum:    ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Hook pre-save: hash password sebelum disimpan.
// Hanya dijalankan kalau field password benar-benar berubah.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method instance: bandingkan password input dengan hash di DB
userSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
