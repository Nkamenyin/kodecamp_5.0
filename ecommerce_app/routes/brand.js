const express = require('express');
const router = express.Router();
const brand = require('../modules/models/brandModel');
const brandControl = require("../modules/controllers/brandController");
const {isAdmin} = require('../middleWares/authentication.js')



// POST /brands - Add a brand
router.post('/', isAdmin, brandControl.createBrand);

// PUT /brands/:id - Update brand
router.put('/:id', isAdmin, brandControl.updateBrand);

// GET /brands - List all brands
router.get('/', brandControl.getBrand);

// DELETE /brands/:id - Delete a brand
router.delete('/:id', isAdmin, brandControl.deleteBrand); 

module.exports = router;