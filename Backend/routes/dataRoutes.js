const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.post('/add', dataController.addData);
router.put('/update/:id', dataController.updateData);
router.get('/', dataController.getAllData);

module.exports = router;
