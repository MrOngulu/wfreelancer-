const express = require("express");
const router = express.Router();

const { mpesaPay } = require("../controllers/mpesaController");
const { mpesaCallback } = require("../controllers/mpesaCallback");

router.post("/mpesa-pay", mpesaPay);
router.post("/mpesa-callback", mpesaCallback);

module.exports = {
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  shortcode: process.env.BUSINESS_SHORTCODE,
  passkey: process.env.PASSKEY,
  callbackUrl: process.env.CALLBACK_URL,
};

module.exports = router;
