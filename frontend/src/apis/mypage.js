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

export const updateNickname = async (newName) => {
  try {
    const res = await client.patch('users/nickname', {
      newNickname: newName,
    });
    return res.data;
  } catch (err) {
    console.error('닉네임 수정에 실패하였습니다', err);
    return null;
  }
};

export const updateFont = async (newFont) => {
  try {
    const res = await client.patch('users/font', {
      font: newFont,
    });
    return true;
  } catch (err) {
    console.error('폰트 수정에 실패하였습니다', err);
    return false;
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
