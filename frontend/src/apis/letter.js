import client from './axios';

export const getKeyringInfo = async (keyringId) => {
  try {
    const { data } = await client.get(`keyrings/${keyringId}`);
    console.log('응답 : ', data);
    return data;
  } catch (err) {
    console.error('키링 상세정보를 가져오지 못했습니다.', err);
  }
};
