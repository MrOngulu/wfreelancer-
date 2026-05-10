const axios = require("axios");
const base64 = require("base-64");
const config = require("../config/mpesa");

const getAccessToken = async () => {
  const auth = base64.encode(
    `${config.consumerKey}:${config.consumerSecret}`
  );

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response.data.access_token;
};

module.exports = getAccessToken;