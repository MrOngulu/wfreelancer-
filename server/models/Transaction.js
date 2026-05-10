const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  status: {
    type: String,
    default: "PENDING", // PENDING | SUCCESS | FAILED
  },
  checkoutRequestId: String,
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);