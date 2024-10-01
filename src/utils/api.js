import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Base URL for your API
});

// Interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Replace 'token' with the name of your cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
