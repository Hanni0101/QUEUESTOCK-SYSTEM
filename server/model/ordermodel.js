const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    order_method: { type: String, enum: ['pickup', 'delivery'], required: true },
    table_num: { type: Number },
    delivery_address: { type: String },
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
