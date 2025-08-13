const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  cost: {
    type: Number,
    required: true,
  },

  productImages: {
    type: [String], // Array of image URLs
    default: [],
  },

  description: {
    type: String,
    required: true,
  },

  stockStatus: {
    type: String,
    enum: ['in stock', 'out of stock'],
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);