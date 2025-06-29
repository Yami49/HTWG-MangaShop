// frontend/src/api.js
import axios from 'axios'

export default axios.create({
  baseURL: 'https://mangashop-backend.onrender.com/',
  withCredentials: true,
  timeout: 10000,
})
