const mongoose = require('mongoose');

const tickerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model('Ticker', tickerSchema);
