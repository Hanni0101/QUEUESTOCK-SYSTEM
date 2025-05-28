const Client = require('../model/qsclientmodel');
const ClientV2 = require('../model/clientv2model');

exports.loginClient = async (req, res) => {
  const { name, password, email } = req.body;

  if (name === 'admin' && password === 'Admin12345@') {
    await Client.create({ name: 'admin', password: 'Admin12345@', role: 'admin' });
    return res.json({ id: null, name: 'admin', role: 'admin' });
  }

  try {
    const existingClient = await ClientV2.findOne({ 
      $or: [
        { email: name }, 
        { name: name }  
      ]
    });

    if (existingClient) {
      if (existingClient.password === password) {
        await Client.create({ name: existingClient.name, password: existingClient.password, role: existingClient.role });
        return res.json({ 
          id: existingClient._id, 
          name: existingClient.name, 
          role: existingClient.role 
        });
      } else {
        return res.status(401).json({ message: 'Invalid password' });
      }
    }

    res.status(401).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerClient = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingClient = await ClientV2.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newClient = new ClientV2({
      name,
      email,
      password,
      role: 'customer'
    });

    await newClient.save();
    res.status(201).json({ 
      id: newClient._id, 
      name: newClient.name,
      email: newClient.email,
      role: 'customer'
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



exports.getAllClients = async (req, res) => {
  try {
    const clients = await ClientV2.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};