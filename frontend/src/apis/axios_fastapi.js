import axios from 'axios';

const FastAPIbaseURL = import.meta.env.VITE_FAST_API_BASE_URL;

const client = axios.create({
  baseURL: FastAPIbaseURL,
  withCredentials: false,
});

export default client;
