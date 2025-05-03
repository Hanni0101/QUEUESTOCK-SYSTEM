// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   product_id: { type: String, required: true },
//   product_name: { type: String, required: true },
//   product_desc: { type: String },
//   product_price: { type: Number, required: true }
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;



// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   product_id:   { type: String, required: true },
//   product_name: { type: String, required: true },
//   product_desc: { type: String },
//   product_price:{ type: Number, required: true }
// }, {
//   timestamps: true,
//   toJSON:    { virtuals: true },
//   toObject:  { virtuals: true }
// });

// productSchema.virtual('available')
//   .get(function() { return this._available; })
//   .set(function(val) { this._available = val; });

// module.exports = mongoose.model('Product', productSchema);


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id:   { type: String, required: true },
  product_name: { type: String, required: true },
  product_desc: { type: String },
  product_price:{ type: Number, required: true },
  product_image: { type: String }
}, {
  timestamps: true,
  toJSON:    { virtuals: true },
  toObject:  { virtuals: true }
});

productSchema.virtual('available')
  .get(function() { return this._available; })
  .set(function(val) { this._available = val; });

module.exports = mongoose.model('Product', productSchema);
