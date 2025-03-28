import client from './axios';

export const getUserInfo = async () => {
  try {
    const res = await client.get('users/mypage');
    return res.data;
  } catch (err) {
    console.error('마이페이지 정보를 가져오지 못했습니다.', err);
    return null;
  }
};

export const updateNickname = async () => {
  try {
  } catch (err) {
    console.error('닉네임 수정에 실패하였습니다', err);
    throw err;
  }
};

export const updateFont = async () => {
  try {
  } catch (err) {
    console.error('폰트 수정에 실패하였습니다', err);
    throw err;
  }
};

export const getKeyringList = async () => {
  try {
    const { data } = await client.get('/keyrings/manage');
    return data;
  } catch (err) {
    console.error('키링 목록 조회 실패!', err);
  }
};

export const updateKeyringName = async ({ keyringId, newName }) => {
  try {
    await client.patch(`/keyrings/${keyringId}/nfcname`, {
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
