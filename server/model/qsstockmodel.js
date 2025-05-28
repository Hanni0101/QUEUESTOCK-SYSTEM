const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  ingredient_name: { type: String, required: true },
  quantity:        { type: Number, required: true },
  product:         { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);
