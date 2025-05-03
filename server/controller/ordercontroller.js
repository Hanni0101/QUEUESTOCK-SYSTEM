// ordercontroller.js
const Order = require('../model/ordermodel');

exports.getOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      console.log('Fetched Orders:', orders); 
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.addOrder = async (req, res) => {
  const {
    product_name,
    product_price,
    quantity,
    total_price,
    delivery_method,
    table_number,
    delivery_address
  } = req.body;
  console.log("Received Order Data:", req.body);

  const newOrder = new Order({
    product_name,
    product_price,
    quantity,
    total_price,
    delivery_method,
    table_number,
    delivery_address
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
