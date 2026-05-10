import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const initiatePayPalPayment = async (amount) => {
  const res = await API.post("/pay", { amount });
  return res.data;
};

export const initiateMpesaPayment = async (phone, amount) => {
  const res = await API.post("/mpesa-pay", {
    phone,
    amount,
  });
  return res.data;
};

export const checkStatus = async () => {
  const res = await API.get("/api/status");
  return res.data;
};

export default API;