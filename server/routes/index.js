// routes/index.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const paypal = require('../config/paypalConfig');
const mpesaConfig = require('../config/mpesaConfig');
const getAccessToken = require('../utils/mpesaAuth');
const Transaction = require('../models/Transaction');

router.get('/', (req, res) => {
  res.json({ message: 'WF Freelancers API running ✅' });
});

router.get('/api/status', (req, res) => {
  res.json({ status: 'API working' });
});

router.post('/mpesa-pay', async (req, res) => {
  const { phone, amount, productName } = req.body;
  if (!phone || !amount) {
    return res.status(400).json({ message: 'phone and amount are required' });
  }
  try {
    const token = await getAccessToken();
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(
      `${mpesaConfig.shortcode}${mpesaConfig.passkey}${timestamp}`
    ).toString('base64');
    const tx = await Transaction.create({
      phone, amount: Number(amount),
      productName: productName || 'WF Product', status: 'PENDING',
    });
    const stkResponse = await axios.post(
      `${mpesaConfig.baseUrl}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: mpesaConfig.shortcode, Password: password,
        Timestamp: timestamp, TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(Number(amount)), PartyA: phone,
        PartyB: mpesaConfig.shortcode, PhoneNumber: phone,
        CallBackURL: mpesaConfig.callbackUrl, AccountReference: `WF-${tx._id}`,
        TransactionDesc: `Payment for ${productName || 'WF Product'}`,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    tx.checkoutRequestId = stkResponse.data.CheckoutRequestID;
    await tx.save();
    return res.json({
      success: true, message: 'STK Push sent — check your phone',
      transactionId: tx._id, checkoutRequestId: stkResponse.data.CheckoutRequestID,
    });
  } catch (err) {
    console.error('M-Pesa STK error:', err.response?.data || err.message);
    return res.status(500).json({ success: false, message: 'M-Pesa payment failed. Please try again.' });
  }
});

router.post('/mpesa-callback', async (req, res) => {
  const io = req.app.get('io');
  try {
    const stk = req.body?.Body?.stkCallback;
    if (!stk) return res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
    const status = stk.ResultCode === 0 ? 'SUCCESS' : 'FAILED';
    const tx = await Transaction.findOneAndUpdate(
      { checkoutRequestId: stk.CheckoutRequestID }, { status }, { new: true }
    );
    if (tx && io) io.emit('mpesa-update', { transactionId: tx._id, status: tx.status });
    return res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (err) {
    console.error('M-Pesa callback error:', err.message);
    return res.status(500).json({ message: 'Callback error' });
  }
});

router.post('/pay', (req, res) => {
  const { amount, productName, currency } = req.body;
  if (!amount || !productName) {
    return res.status(400).json({ message: 'amount and productName are required' });
  }
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const priceStr = Number(amount).toFixed(2);
  const curr = currency || 'USD';
  paypal.payment.create({
    intent: 'sale', payer: { payment_method: 'paypal' },
    redirect_urls: {
      return_url: `${frontendUrl}/payment-success`,
      cancel_url: `${frontendUrl}/payment-cancel`,
    },
    transactions: [{
      item_list: { items: [{ name: productName, sku: productName.toLowerCase().replace(/\s+/g, '-'), price: priceStr, currency: curr, quantity: 1 }] },
      amount: { total: priceStr, currency: curr },
      description: `Payment for ${productName} — WF Freelancers`,
    }],
  }, (error, payment) => {
    if (error) {
      console.error('PayPal create error:', error.response);
      return res.status(500).json({ success: false, message: 'PayPal payment creation failed' });
    }
    const approvalUrl = payment.links?.find((l) => l.rel === 'approval_url')?.href;
    return res.json({ success: true, approvalUrl, paymentId: payment.id });
  });
});

router.get('/paypal-execute', (req, res) => {
  const { paymentId, PayerID } = req.query;
  if (!paymentId || !PayerID) {
    return res.status(400).json({ message: 'paymentId and PayerID are required' });
  }
  paypal.payment.execute(paymentId, { payer_id: PayerID }, (error, payment) => {
    if (error) {
      console.error('PayPal execute error:', error.response);
      return res.status(500).json({ success: false, message: 'PayPal payment execution failed' });
    }
    return res.json({ success: true, message: 'Payment successful', paymentId: payment.id, state: payment.state });
  });
});

router.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'name, email and message are required' });
  }
  try {
    const result = await resend.emails.send({
      from: 'WF Freelancers <onboarding@resend.dev>',
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New message from ${name} — WF Freelancers`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });
    console.log('Resend result:', JSON.stringify(result));
    return res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Email send error:', err.message);
    return res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;