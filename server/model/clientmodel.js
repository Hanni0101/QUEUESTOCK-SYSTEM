const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], required: true }
});

module.exports = mongoose.model('Client', ClientSchema);
