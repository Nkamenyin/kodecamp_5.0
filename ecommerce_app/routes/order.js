const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleWares/authentication');

// Customer only
router.post('/', authenticate, authorize('customer'), orderController.createOrder);

// Admin only
router.get('/', authenticate, authorize('admin'), orderController.getAllOrders);
router.get('/:id', authenticate, authorize('admin'), orderController.getOrderById);
router.patch('/:id', authenticate, authorize('admin'), orderController.updateOrderStatus);

module.exports = router;
