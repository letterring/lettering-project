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

export const getLetterDetail = async (messageId) => {
  try {
    const { data } = await client.get(`/messages/letters/dear/${messageId}`);
    return data;
  } catch (err) {
    console.error('편지 상세정보 조회에 실패했습니다.', err);
  }
};

export const getSentLetterDetail = async (messageId) => {
  try {
    const { data } = await client.get(`/messages/letters/sender/${messageId}`);
    return data;
  } catch (err) {
    console.error('편지 상세정보 조회에 실패했습니다.', err);
  }
};
