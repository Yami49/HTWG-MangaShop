// frontend/src/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'https://mangashop-backend.onrender.com', // URL deines Sails-Backends
  timeout: 10000,
});
