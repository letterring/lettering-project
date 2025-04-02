import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8001',
  withCredentials: false,
});

export default client;
