// config/paypalConfig.js
// Switch to live by setting PAYPAL_ENV=live in Render env vars

const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox',
  client_id: process.env.PAYPAL_CLIENT,
  client_secret: process.env.PAYPAL_SECRET,
});

module.exports = paypal;
