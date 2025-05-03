const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name:     { type: String, required: true },      
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin','customer'], default: 'customer' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);
