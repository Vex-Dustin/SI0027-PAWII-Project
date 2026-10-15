// Mini Project - Pertemuan 9-10: Model Mahasiswa
// TODO 1: lengkapi Schema di bawah ini.

const mongoose = require("mongoose");

const alamatSchema = new mongoose.Schema(
  {
    jalan: String,
    kota: String,
  },
  { _id: false }
);

const mahasiswaSchema = new mongoose.Schema({

  nama: {type: String, require: true},
  nim: {type: String, require: true, unique: true},
  alamat: {type: alamatSchema},
  prodiId: {type: mongoose.Schema.Types.ObjectId, ref: "Prodi"},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mahasiswa", mahasiswaSchema);
