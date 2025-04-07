// 서버 통신 기본 설정
//로컬에 .env 파일 만들고 VITE_API_BASE_URL 설정하기

import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const client = axios.create({
  baseURL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함하여 요청
});

export default client;

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const currentPath = window.location.pathname;

    if (
      status === 401 &&
      currentPath !== '/login' &&
      currentPath !== '/signup' &&
      currentPath !== '/' &&
      currentPath !== '/dear'
    ) {
      console.log('인증');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
