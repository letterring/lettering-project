import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getKeyringList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/keyrings/manage`);
    return response.data;
  } catch (error) {
    console.error('키링 목록 가져오기 실패:', error);
    throw error;
  }
};
