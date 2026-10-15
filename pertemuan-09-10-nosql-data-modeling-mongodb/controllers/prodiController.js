// Mini Project - Pertemuan 9-10: Controller Prodi (sudah lengkap)

const Prodi = require("../models/prodiModel");

exports.getAll = async (req, res) => {
  const data = await Prodi.find();
  res.json(data);
};

exports.create = async (req, res) => {
  try {
    const prodi = await Prodi.create(req.body);
    res.status(201).json(prodi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};