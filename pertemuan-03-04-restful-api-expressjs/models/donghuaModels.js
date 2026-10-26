const mongoose = require('mongoose');

const donghuaSchema = new mongoose.Schema(
    {
        judul: {
            type: String,
            required: [true, 'Judul film donghua wajib diisi'],
            trim: true
        },
        rilis: {
            type: String,
            required: [true, 'Tahun rilis wajib diisi']
        },
        episode: {
            type: Number,
            required: [true, 'Jumlah episode wajib diisi'],
            min: [1, 'Jumlah episode minimal 1']
        },
        genre: {
            type: String,
            required: [true, 'Genre wajib diisi']
        }
    },
    {
        timestamps: true // Otomatis menambahkan createdAt dan updatedAt
    }
);

module.exports = mongoose.model('Donghua', donghuaSchema);