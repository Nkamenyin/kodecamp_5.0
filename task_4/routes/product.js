const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const {authenticate, authorize} = require('../middleWares/authentication');

// GET /products — accessible to everyone
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('ownerId', 'fullName email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message });
  }
});

// POST /products — admin only
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { productName, cost, productImages, description, stockStatus } = req.body;

    const product = new Product({
      productName,
      ownerId: req.user.userId,
      cost,
      productImages,
      description,
      stockStatus
    });

    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /products/:id — admin only
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;