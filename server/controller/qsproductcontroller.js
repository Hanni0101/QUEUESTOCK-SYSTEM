const Product = require('../model/qsproductmodel');
const Stock   = require('../model/qsstockmodel');

exports.createProduct = async (req, res) => {
    try {
      const { product_id, product_name, product_desc, product_price, product_image } = req.body;
      const p = await Product.create({
        product_id,
        product_name,
        product_desc,
        product_price,
        product_image  
      });
      res.status(201).json(p);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const stocks   = await Stock.find({ quantity: { $gt: 0 } });

    const inStockIds = new Set(stocks.map(s => s.product.toString()));

    const result = products.map(prod => {
      const obj = prod.toObject();
      obj.available = inStockIds.has(prod._id.toString());
      return obj;
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
    try {
      const { product_id, product_name, product_desc, product_price, product_image } = req.body;
      const upd = await Product.findByIdAndUpdate(
        req.params.id, 
        { product_id, product_name, product_desc, product_price, product_image },  
        { new: true }
      );
      if (!upd) return res.status(404).json({ message: 'Product not found' });
      res.json(upd);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
exports.deleteProduct = async (req, res) => {
  try {
    const del = await Product.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
