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

export const updateKeyringName = async () => {
  try {
  } catch (err) {
    console.error('키링 이름 수정 실패', err);
    throw err;
  }
};

export const toggleKeyringFavoirite = async () => {
  try {
  } catch (err) {
    console.error('키링 즐겨찾기 토글 실패', err);
    throw err;
  }
};

export const deleteKeyring = async () => {
  try {
  } catch (err) {
    console.error('키링 삭제 실패', err);
    throw err;
  }
};
