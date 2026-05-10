const axios = require("axios");
const moment = require("moment");
const getAccessToken = require("../utils/mpesaAuth");
const Transaction = require("../models/Transaction");
const config = require("../routes/mpesaConfig");

exports.mpesaPay = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const token = await getAccessToken();

    const timestamp = moment().format("YYYYMMDDHHmmss");

    const password = Buffer.from(
      config.shortcode + config.passkey + timestamp
    ).toString("base64");

    // 1. Save transaction first
    const tx = await Transaction.create({
      phone,
      amount,
      status: "PENDING",
    });

    // 2. STK Push request
    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: config.shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: config.shortcode,
        PhoneNumber: phone,
        CallBackURL: config.callbackUrl,
        AccountReference: `WF-${tx._id}`,
        TransactionDesc: "WF Freelancers Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 3. Save CheckoutRequestID
    tx.checkoutRequestId = stkResponse.data.CheckoutRequestID;
    await tx.save();

    res.json({
      transactionId: tx._id,
      CheckoutRequestID: stkResponse.data.CheckoutRequestID,
      Response: stkResponse.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "STK Push failed" });
  }
};