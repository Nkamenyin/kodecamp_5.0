const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({ 
  productName: {
    type: String,
    required: true,
    trim: true,
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  /*customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },*/

  quantity: {
    type: Number,
    required:true,
  },

totalCost: {
    type: Numberg,
    required: true,
  },

  shippingStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: pending,
  },

}, {timestamps: true});


//const orderModel = mongoose.model('Order', userSchema);

module.exports = orderModel;