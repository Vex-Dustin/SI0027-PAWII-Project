const Donghua = require('../models/donghuaModels');

// GET All Donghua (Filter, Sort, Projection, Pagination)
exports.getAllDonghua = async (req, res, next) => {
    try {
        // 1. FILTERING
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        let filter = {};
        for (let key in queryObj) {
            if (key === 'genre' || key === 'judul') {
                // Pencarian fleksibel (case-insensitive) untuk judul & genre
                filter[key] = { $regex: queryObj[key], $options: 'i' };
            } else if (typeof queryObj[key] === 'object') {
                // Mendukung operator perbandingan: gte, gt, lte, lt (contoh: ?episode[gte]=100)
                let str = JSON.stringify(queryObj[key]);
                str = str.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
                filter[key] = JSON.parse(str);
            } else {
                filter[key] = queryObj[key];
            }
        }

        let query = Donghua.find(filter);

        // 2. SORTING (contoh: ?sort=episode atau ?sort=-episode untuk descending)
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt'); // Default: terbaru di atas
        }

        // 3. PROJECTION / PEMILIHAN FIELD (contoh: ?fields=judul,genre)
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v'); // Sembunyikan properti internal __v
        }

        // 4. PAGINATION (contoh: ?page=1&limit=5)
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // Eksekusi query dan hitung total dokumen
        const donghua = await query;
        const totalData = await Donghua.countDocuments(filter);

        res.status(200).json({
            status: 'success',
            page,
            limit,
            totalData,
            totalPages: Math.ceil(totalData / limit),
            results: donghua.length,
            data: donghua
        });
    } catch (error) {
        next(error);
    }
};

// GET Donghua By ID
exports.getDonghuaById = async (req, res, next) => {
    try {
        const data = await Donghua.findById(req.params.id).select('-__v');
        if (!data) {
            const error = new Error('Data film tidak ditemukan');
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (error) {
        next(error);
    }
};

// POST Create Donghua (Mendukung 1 data objek atau banyak data Array sekaligus)
exports.createDonghua = async (req, res, next) => {
    try {
        const newDonghua = await Donghua.create(req.body);
        res.status(201).json({
            status: 'success',
            results: Array.isArray(newDonghua) ? newDonghua.length : 1,
            data: newDonghua
        });
    } catch (error) {
        next(error);
    }
};

// PUT Update Donghua
exports.updateDonghua = async (req, res, next) => {
    try {
        const updatedDonghua = await Donghua.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Mengembalikan data yang sudah diperbarui
                runValidators: true // Menjalankan validasi schema saat update
            }
        );

        if (!updatedDonghua) {
            const error = new Error('Data film tidak ditemukan');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            status: 'success',
            data: updatedDonghua
        });
    } catch (error) {
        next(error);
    }
};

// DELETE Donghua
exports.deleteDonghua = async (req, res, next) => {
    try {
        const deletedDonghua = await Donghua.findByIdAndDelete(req.params.id);

        if (!deletedDonghua) {
            const error = new Error('Data film tidak ditemukan');
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            status: 'success',
            message: 'Data film berhasil dihapus'
        });
    } catch (error) {
        next(error);
    }
};