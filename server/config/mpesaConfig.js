// config/mpesaConfig.js
// Switch to live by setting MPESA_ENV=live in Render env vars

const isLive = process.env.MPESA_ENV === 'live';

module.exports = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  shortcode: process.env.BUSINESS_SHORTCODE,
  passkey: process.env.PASSKEY,
  callbackUrl: process.env.CALLBACK_URL, // must be your Render URL, e.g. https://wfreelancer.onrender.com/mpesa-callback
  baseUrl: isLive
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke',
};
