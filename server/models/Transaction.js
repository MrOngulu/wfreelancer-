// models/Transaction.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    productName: { type: String, default: 'WF Product' },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING',
    },
    checkoutRequestId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
