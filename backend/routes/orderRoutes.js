const express = require('express');
const router = express.Router();
const { placeOrder, myOrders } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, placeOrder);
router.get('/', protect, myOrders);

module.exports = router;
