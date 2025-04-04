import axios from 'axios';

const FastAPIbaseURL = import.meta.env.VITE_FAST_API_BASE_URL;
// console.log('✅ FastAPI baseURL:', FastAPIbaseURL);

const AiClient = axios.create({
  baseURL: FastAPIbaseURL,
  withCredentials: false,
});

export default AiClient;

// AiClient.interceptors.request.use((config) => {
//   console.log('🛰️ 요청 주소:', config.baseURL + config.url);
//   return config;
// });
