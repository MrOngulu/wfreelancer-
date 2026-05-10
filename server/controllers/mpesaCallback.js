const Transaction = require("../models/Transaction");

exports.mpesaCallback = async (req, res) => {
  const io = req.app.get("io");

  try {
    const callback = req.body;

    const stk = callback.Body.stkCallback;

    const checkoutId = stk.CheckoutRequestID;
    const resultCode = stk.ResultCode;

    const status = resultCode === 0 ? "SUCCESS" : "FAILED";

    const tx = await Transaction.findOneAndUpdate(
      { checkoutRequestId: checkoutId },
      { status },
      { new: true }
    );

    // 🔥 REAL-TIME UPDATE
    io.emit("mpesa-update", {
      transactionId: tx._id,
      status: tx.status,
    });

    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Callback error" });
  }
};