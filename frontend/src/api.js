// frontend/src/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:1337', // URL deines Sails-Backends
  timeout: 10000,
});
