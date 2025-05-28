const Order = require('../model/ordermodel');
const { v4: uuidv4 } = require('uuid');
const Product = require('../model/qsproductmodel');
const Stock = require('../model/qsstockmodel');
const Delivered = require('../model/deliveredmodel');


exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });
    console.log('Fetched Orders:', orders);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.addOrder = async (req, res) => {
  const {
    customer_name,
    product_name,
    product_price,
    quantity,
    total_price,
    delivery_method,
    table_number,
    delivery_address,
    amount,
    change,
  } = req.body;

  if (!customer_name) {
    return res.status(400).json({ message: "Customer name is required" });
  }

  if (!product_name || !product_price || !quantity || !total_price || !delivery_method || amount === undefined || change === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newOrder = new Order({
    order_id: uuidv4(),
    customer_name,
    product_name,
    product_price,
    quantity,
    total_price,
    delivery_method,
    table_number,
    delivery_address,
    amount,
    change,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    if (req.body.status === 'Delivered') {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });

      const product = await Product.findOne({ product_name: order.product_name });
      if (!product) return res.status(404).json({ message: 'Product not found' });

      const stocks = await Stock.find({ product: product._id });
      const totalStock = stocks.reduce((sum, stock) => sum + stock.quantity, 0);

      if (totalStock < order.quantity) {
        return res.status(400).json({ message: 'Cannot deliver: Not enough stock.' });
      }

      for (const stock of stocks) {
        await Stock.findByIdAndUpdate(
          stock._id,
          { $inc: { quantity: -order.quantity } }
        );
      }

      await Delivered.create({
        customer_name: order.customer_name,
        product_name: order.product_name,
        quantity: order.quantity,
        total_price: order.total_price
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.acceptOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'Accepted' },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getDeliveredOrders = async (req, res) => {
  try {
    const deliveredOrders = await Delivered.find();
    res.json(deliveredOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
