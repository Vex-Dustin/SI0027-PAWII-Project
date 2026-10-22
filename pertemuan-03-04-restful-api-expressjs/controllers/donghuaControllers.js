const donghuaModel = require('../models/donghuaModels');

exports.getAllDonghua = (req, res) => {
    const donghua = donghuaModel.getAllDonghua();
    res.status(200).json(donghua);
};

exports.getDonghuaById = (req, res) => {
    const id = parseInt(req.params.id);
    const data = donghuaModel.getDonghuaById(id);
    if (!data) return res.status(404).json({ message: 'Data film tidak ditemukan' });
    res.status(200).json(data);
}

exports.createDonghua = (req, res) => {
    const { judul, rilis, episode, genre } = req.body;
    const newDonghua = donghuaModel.createDonghua({
        judul,
        rilis,
        episode,
        genre
    });
    res.status(201).json(newDonghua);
}

exports.updateDonghua = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const updatedDonghua = donghuaModel.updateDonghua(id, updatedData);
    if (!updatedDonghua) return res.status(404).json({ message: 'Data film tidak ditemukan' });
    res.status(200).json(updatedDonghua);
}

exports.deleteDonghua = (req, res) => {
    const id = parseInt(req.params.id);
    const deletedDonghua = donghuaModel.deleteDonghua(id);
    if (!deletedDonghua) return res.status(404).json({ message: 'Data film tidak ditemukan' });
    res.status(200).json({ message: 'Data film berhasil dihapus' }); 
}