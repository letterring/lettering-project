//전역 상태관리 > recoil
//대문자 카멜케이스 네이밍
//관리하는게 상태일 경우 ~State로 네이밍밍

import { atom } from 'recoil';

//유저 아이디
const UserId = atom({
  key: 'userid',
  default: 1,
});

// 업로드한 이미지 미리보기
const PostcardImage = atom({
  key: 'postcardImage',
  default: null,
});

// 엽서 쓰기 API 시 이미지 파일
const PostcardImageFile = atom({
  key: 'postcardImageFile',
  default: null,
});

// 엽서 쓰기 API 시 내용
const PostcardText = atom({
  key: 'postcardText',
  default: '',
});

// 전송 대상 선택 시 (키링id)
const SelectedKeyringId = atom({
  key: 'selectedKeyringId',
  default: 'null',
});

export { PostcardImage, PostcardImageFile, PostcardText, SelectedKeyringId, UserId };
