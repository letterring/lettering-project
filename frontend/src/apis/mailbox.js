import client from './axios';

//보낸 편지함에서 목록 조회
export const getSenderMessages = async (page) => {
  try {
    const { data } = await client.get(`/messages/sender?page=${page}`);
    return data;
  } catch (error) {
    console.error('보낸 편지함 목록 조회 실패:', error);
  }
};

//받은은 편지함에서 목록 조회
export const getDearMessages = async (page, keyringId) => {
  try {
    const { data } = await client.get(`/messages/dear/${keyringId}?page=${page}`);
    return data;
  } catch (error) {
    console.error('받은 편지함 목록 조회 실패:', error);
  }
};
