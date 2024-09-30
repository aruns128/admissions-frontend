import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL for your API
});

export default api;
