// utils/mpesaAuth.js

const axios = require('axios');
const config = require('../config/mpesaConfig');

const getAccessToken = async () => {
  const auth = Buffer.from(
    `${config.consumerKey}:${config.consumerSecret}`
  ).toString('base64');

  const response = await axios.get(
    `${config.baseUrl}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );

  return response.data.access_token;
};

module.exports = getAccessToken;
