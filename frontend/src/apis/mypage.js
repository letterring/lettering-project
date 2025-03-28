import client from './axios';

export const getUserInfo = async () => {
  try {
    const { data } = await client.get('users/mypage');
    return data;
  } catch (err) {
    console.error('마이페이지 정보를 가져오지 못했습니다.', err);
  }
};

export const updateNickname = async (newNickname) => {
  try {
    const { data } = await client.patch('users/nickname', { newNickname });
    return data;
  } catch (err) {
    console.error('닉네임 수정에 실패하였습니다', err);
  }
};

export const updateFont = async (font) => {
  try {
    const res = await client.patch('users/font', {
      font,
    });
    return true;
  } catch (err) {
    console.error('폰트 수정에 실패하였습니다', err);
    return false;
  }
};
