const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
