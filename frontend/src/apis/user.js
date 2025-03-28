import client from './axios';

export const signup = async (user) => {
  try {
    const res = await client.post(`/users/signup`, user);
    return res.data;
  } catch (err) {
    console.error('회원가입 오류:', err);
    const errorMessage =
      err.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.';
    alert(errorMessage);

    return null;
  }
};

export const login = async (userInfo) => {
  try {
    const res = await client.post(`/users/login`, userInfo);
    return res.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || '로그인에 실패하였습니다. 다시 시도해 주세요.';
    console.error('로그인 실패: ', err);
    alert(errorMessage);
    return null;
  }
};

export const getUserData = async () => {
  try {
    const { data } = await client.get(`/users/me`);
    return data;
  } catch (err) {
    console.error('세션 조회 실패', err);
    throw err;
  }
};

export const logout = async () => {
  try {
    const res = await client.post(`/users/logout`, {
      mode: 'cors',
    });

    return res;
  } catch (err) {
    console.error('로그아웃 요청 실패', err);
    throw err;
  }
};
