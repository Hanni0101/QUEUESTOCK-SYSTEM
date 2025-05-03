const Client = require('../model/qsclientmodel');

exports.loginClient = async (req, res) => {
  const { name, password } = req.body;

  if (name === 'admin' && password === 'Admin12345@') {
    return res.json({ id: null, name: 'admin', role: 'admin' });
  }

  try {
    const newCust = new Client({ name, password, role: 'customer' });
    await newCust.save();
    res.json({ id: newCust._id, name, role: 'customer' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
