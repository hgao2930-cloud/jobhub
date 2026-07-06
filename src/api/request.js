import axios from 'axios'

const baseURL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001'
  : 'https://jobhub-api-qk54.onrender.com'

const request = axios.create({
  baseURL,
  timeout: 10000
})

export default request