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
    type: [String],
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
}, {timestamps: true});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;