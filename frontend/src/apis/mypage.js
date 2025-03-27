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
    return res.data;
  } catch (err) {
    console.error('폰트 수정에 실패하였습니다', err);
    return null;
  }
};
