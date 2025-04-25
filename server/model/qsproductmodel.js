const mongoose = require('mongoose');

const QSProductSchema = new mongoose.Schema({
    product_id: { type: String, required: true, unique: true },
    product_name: { type: String, required: true },
    product_desc: { type: String },
    product_price: { type: Number, required: true }
});

module.exports = mongoose.model('Product', QSProductSchema);
