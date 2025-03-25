//전역 상태관리 > recoil
//대문자 카멜케이스 네이밍
//관리하는게 상태일 경우 ~State로 네이밍밍

import { atom } from 'recoil';

//유저 아이디
const UserId = atom({
  key: 'userid',
  default: 1,
});

// 엽서 쓰기 시 업로드한 이미지
const PostcardImage = atom({
  key: 'postcardImage',
  default: null,
});

// 엽서 쓰기 시 내용
const PostcardText = atom({
  key: 'postcardText',
  default: '',
});

export { PostcardImage, PostcardText, UserId };
