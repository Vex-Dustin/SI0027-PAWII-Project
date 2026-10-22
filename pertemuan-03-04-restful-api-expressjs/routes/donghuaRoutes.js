const express = require('express');
const router = express.Router();
const donghuaController = require('../controllers/donghuaControllers');

router.get('/', donghuaController.getAllDonghua);
router.get('/:id', donghuaController.getDonghuaById);
router.post('/', donghuaController.createDonghua);
router.put('/:id', donghuaController.updateDonghua);
router.delete('/:id', donghuaController.deleteDonghua);

module.exports = router;