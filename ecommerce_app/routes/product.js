const express = require('express');
const router = express.Router();
const Product = require('../modules/models/productModel');
const productController = require('../modules/controllers/productController');
const {authenticate, authorize} = require('../middleWares/authentication');

// GET /products — accessible to everyone
router.get('/', productController.getProduct);

// POST /products — admin only
router.post('/', authenticate, authorize('admin'), productController.addProduct);

// DELETE /products/:id — admin only
router.delete('/:id', authenticate, authorize('admin'), productController.deleteProduct);

module.exports = router;