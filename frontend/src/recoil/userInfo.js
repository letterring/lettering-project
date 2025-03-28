import { atom } from 'recoil';

export const UserNickname = atom({
  key: 'UserNickname',
  default: '사용자닉네임',
});

export const UserFont = atom({
  key: 'UserFont',
  default: 'Gomsin',
});

export const UserKeyringList = atom({
  key: 'UserKeyringlist',
  default: [],
});
