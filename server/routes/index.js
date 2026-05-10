const express = require('express');
const router = express.Router();
const paypal = require('./paypalConfig');
const axios = require('axios');
require('dotenv').config();

router.get('/api/status', (req, res) => {
  res.json({ status: "API working" });
});

router.get('/service-details', (req, res) => {
  const service = req.query.service || 'our service';
  res.json({ service });
});

router.post('/submit-contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log("New message:", { name, email, message });

  res.json({ success: true, message: "Message received" });
});

router.get('/', (req, res) => {
  res.json({ message: "WF Freelancers API running" });
});

// PayPal Payment Route
router.post('/pay', (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    },
    transactions: [{
      item_list: {
        items: [{
          name: "Web Development Service",
          sku: "001",
          price: "300.00",
          currency: "USD",
          quantity: 1
        }]
      },
      amount: {
        total: "300.00",
        currency: "USD"
      },
      description: "Payment for freelance web dev service."
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "PayPal payment failed"
      });
    }

    const approvalUrl = payment.links.find(
      (link) => link.rel === "approval_url"
    )?.href;

    return res.json({
      success: true,
      approvalUrl: approvalUrl
    });
  });
});

// Success Page
router.get('/success', (req, res) => {
  res.send('Thank you for your PayPal payment!');
});

// M-Pesa Payment
async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  const response = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: { Authorization: `Basic ${auth}` }
    }
  );

  return response.data.access_token;
}

router.post('/mpesa-pay', async (req, res) => {
  const token = await getAccessToken();
  const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

  const payload = {
    BusinessShortCode: process.env.BUSINESS_SHORTCODE,
    Password: Buffer.from(
      `${process.env.BUSINESS_SHORTCODE}${process.env.PASSKEY}${new Date().toISOString().slice(0,10).replace(/-/g,"")}`
    ).toString('base64'),
    Timestamp: new Date().toISOString().slice(0,10).replace(/-/g,"") + new Date().toTimeString().slice(0,6).replace(/:/g,""),
    TransactionType: "CustomerPayBillOnline",
    Amount: "300",
    PartyA: req.body.phone,
    PartyB: process.env.BUSINESS_SHORTCODE,
    PhoneNumber: req.body.phone,
    CallBackURL: "http://localhost:5000/mpesa-callback",
    AccountReference: "WFREELANCERS",
    TransactionDesc: "Web Dev Service"
  };

  const response = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json({
    success: true,
    message: "STK Push sent successfully",
    checkoutRequestId: response.data.CheckoutRequestID,
    merchantRequestId: response.data.MerchantRequestID
  });

});


module.exports = router;
