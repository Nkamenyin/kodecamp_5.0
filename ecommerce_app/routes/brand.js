const express = require('express');
const router = express.Router();
const brand = require('../modules/models/brandModel');
const brandControl = require("../modules/controllers/brandController");
const {authenticate, authorize} = require('../middleWares/authentication');


// POST /brands - Add a brand
router.post('/', authenticate, authorize('admin'), brandControl.createBrand);

// PUT /brands/:id - Update brand
router.put('/:id', authenticate, authorize('admin'), brandControl.updateBrand);

// GET /brands - List all brands
router.get('/', brandControl.getBrand);

// DELETE /brands/:id - Delete a brand
router.delete('/:id', authenticate, authorize('admin'), brandControl.deleteBrand); 

module.exports = router;