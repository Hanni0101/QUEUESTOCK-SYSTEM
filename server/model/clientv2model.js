const mongoose = require('mongoose');

const ClientV2Schema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: 'Name must only contain letters and spaces'
    }
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['customer'],
    default: 'customer'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ClientV2', ClientV2Schema);