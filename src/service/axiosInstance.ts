// generate axios instance

import axios from "axios";

//TODO: Change the baseURL to actual API URL and use environment variables
const baseURL = process.env.NODE_ENV === 'production' ? 'https://api.example.com' : 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;