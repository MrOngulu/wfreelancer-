import axios from "axios";

const API = axios.create({
  baseURL: "https://wfreelancer.onrender.com",
});

export default API;