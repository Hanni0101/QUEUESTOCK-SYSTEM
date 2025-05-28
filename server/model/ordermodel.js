const mongoose = require('mongoose'); 
const orderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true },
  customer_name: { 
    type: String, 
    required: true 
  },
  product_name: { type: String, required: true },
  product_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true },
  delivery_method: { type: String, required: true },
  table_number: { type: String },
  delivery_address: { type: String },
  amount: { type: Number, required: true },
  change: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Accepted', 'Delivered'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

