import client from './axios';

export const signup = async (user) => {
  try {
    const res = await client.post(`/users/signup`, user);
    return res;
  } catch (err) {
    console.error('회원가입 오류:', err);
    throw err;
  }
};

export const login = async (userInfo) => {
  try {
    const res = await client.post(`/users/login`, userInfo);
    return res;
  } catch (err) {
    console.error('로그인 실패: ', err);
    throw err;
  }
};

export const getUserData = async () => {
  try {
    const { data } = await client.get(`/users/me`);
    return data;
  } catch (err) {
    console.error('세션 조회 실패', err);
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
  }
};
