// const Stock = require('../model/qsstockmodel');

// exports.createStock = async (req, res) => {
//   try {
//     const newStock = await Stock.create(req.body);
//     res.status(201).json(newStock);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.getAllStocks = async (req, res) => {
//   try {
//     const stocks = await Stock.find();
//     res.json(stocks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updateStock = async (req, res) => {
//   try {
//     const updatedStock = await Stock.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedStock) return res.status(404).json({ message: 'Stock not found' });
//     res.json(updatedStock);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// exports.deleteStock = async (req, res) => {
//   try {
//     const deletedStock = await Stock.findByIdAndDelete(req.params.id);
//     if (!deletedStock) return res.status(404).json({ message: 'Stock not found' });
//     res.json({ message: 'Stock deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// server/controller/qsstockcontroller.js
const Stock = require('../model/qsstockmodel');

exports.createStock = async (req, res) => {
  try {
    const newStock = await Stock.create(req.body);
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock
      .find()
      .populate('product', 'product_name');
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const updatedStock = await Stock
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('product', 'product_name');
    if (!updatedStock) 
      return res.status(404).json({ message: 'Stock not found' });
    res.json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) 
      return res.status(404).json({ message: 'Stock not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
