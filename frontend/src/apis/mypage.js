import client from './axios';

export const getUserInfo = async () => {
  try {
    const res = await client.get('users/mypage');
    return res;
  } catch (err) {
    console.error('마이페이지 정보를 가져오지 못했습니다.', err);
    throw err;
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
