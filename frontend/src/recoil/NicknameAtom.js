import { atom } from 'recoil';

export const nicknameState = atom({
  key: 'NicknameState',
  default: '나나', // 초기 닉네임 값은 빈 문자열 또는 서버에서 받아오기
});
