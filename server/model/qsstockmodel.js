// const mongoose = require('mongoose');

// const stockSchema = new mongoose.Schema({
//   stock_id: { type: String, required: true },
//   stock_name: { type: String, required: true },
//   quantity: { type: Number, required: true },
//   product_id: { type: String, required: true } 
// });

// const Stock = mongoose.model('Stock', stockSchema);

// module.exports = Stock;


// server/model/qsstockmodel.js
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
