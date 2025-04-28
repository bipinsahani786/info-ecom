const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');

    if (!cart || cart.products.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const total = cart.products.reduce((sum, p) => sum + (p.productId.price * p.quantity), 0);

    const order = await Order.create({
      userId: req.user.id,
      products: cart.products,
      total,
    });

    // Clear cart after placing order
    cart.products = [];
    await cart.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
