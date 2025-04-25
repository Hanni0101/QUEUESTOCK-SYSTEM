const Order = require('../model/ordermodel');

exports.createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customer_id');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
