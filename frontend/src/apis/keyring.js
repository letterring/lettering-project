import axios from 'axios';

import client from './axios';

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

export const updateKeyringName = async ({ keyringId, newName }) => {
  try {
    await client.patch(`/api/keyrings/${keyringId}/nfcname`, {
      nfcName: newName,
    });
    return true;
  } catch (err) {
    console.error('키링 이름 수정 실패', err);
    return false;
  }
};

export const toggleKeyringFavoirite = async ({ keyringId }) => {
  try {
    await client.patch(`/keyrings/${keyringId}/favorite`);
    return true;
  } catch (err) {
    console.error('키링 즐겨찾기 토글 실패', err);
    return false;
  }
};

export const deleteKeyring = async ({ keyringId }) => {
  try {
    await client.delete(`keyrings/${keyringId}`);
    return true;
  } catch (err) {
    console.error('키링 삭제 실패', err);
    return false;
  }
};
