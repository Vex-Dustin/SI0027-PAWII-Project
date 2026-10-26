module.exports = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Terjadi kesalahan pada server';

    // Handle error jika format ObjectId MongoDB tidak valid
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Format ID tidak valid: ${err.value}`;
    }

    // Handle error jika validasi Schema gagal (contoh: field kosong)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors).map((el) => el.message);
        message = `Input data tidak valid: ${errors.join(', ')}`;
    }

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};