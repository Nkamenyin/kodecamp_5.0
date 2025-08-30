const Order = require('../models/orderModel');
const mongoose = require('mongoose');



// POST /order - Customers only
const createOrder = async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({message: 'Only customers can place orders.'});
    }

    const orders = req.body;

    const customerId = req.user.userId;

    const formattedOrders = orders.map(order => ({
      ...order,
      customerId,
      productId: new mongoose.Types.ObjectId(String(order.productId)),
      ownerId: new mongoose.Types.ObjectId(String(order.ownerId))
    }));

    const savedOrders = await Order.insertMany(formattedOrders);

    res.status(201).json({
      message: 'Orders created successfully',
      orders: savedOrders
    });
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({message: 'Server error', error: err.message});
  }
};


// GET /order — Admin only
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('productId ownerId customerId', 'productName fullName email');
    res.json(orders);
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message});
  }
};

// GET /order/:id — Admin only
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('productId ownerId customerId', 'productName fullName email');

    if (!order) return res.status(404).json({message: 'Order not found'});

    res.json(order);
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message});
  }
};

// PATCH /order/:id — Admin only
const updateOrderStatus = async (req, res) => {
  try {
    const {shippingStatus} = req.body;

    if (!['pending', 'shipped', 'delivered'].includes(shippingStatus)) {
      return res.status(400).json({message: 'Invalid shipping status'});
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {shippingStatus},
      {new: true}
    );

    if (!order) return res.status(404).json({message: 'Order not found'});

    res.json({message: 'Order status updated', order});
  } catch (err) {
    res.status(500).json({message: 'Server error', error: err.message});
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};
