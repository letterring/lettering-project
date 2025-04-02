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
    // 401 에러 발생 시 (sessionToken 만료)
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
