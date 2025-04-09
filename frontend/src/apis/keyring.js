import client from './axios';

//전송 대상 키링정보 조회
export const getKeyringList = async () => {
  try {
    const { data } = await client.get(`/keyrings/manage`);
    console.log('Keyring List:', data);
    return data; // 배열 형태로 반환됨
  } catch (error) {
    console.error('키링 목록 조회 실패:', error);
  }
};

//판매 키링종류 조회
export const getKeyringsData = async () => {
  try {
    const { data } = await client.get(`/keyrings/designs`);
    return data;
  } catch (error) {
    console.error('판매 키링 종류 조회 실패:', error);
  }
};

//판매 키링정보 조회
export const getKeyringData = async (keyringId) => {
  try {
    const { data } = await client.get(`/keyrings/designs/${keyringId}`);
    return data;
  } catch (error) {
    console.error('판매 키링 정보 조회 실패:', error);
  }
};
