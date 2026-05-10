// config/paypalConfig.js
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // 'live' for production
  client_id: process.env.PAYPAL_CLIENT,
  client_secret: process.env.PAYPAL_SECRET
});

module.exports = paypal;