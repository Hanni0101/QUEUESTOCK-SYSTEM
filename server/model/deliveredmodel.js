const mongoose = require('mongoose');

const deliveredSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true },
  delivered_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivered', deliveredSchema);