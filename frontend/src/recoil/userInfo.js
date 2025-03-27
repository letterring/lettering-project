import { atom } from 'recoil';

export const UserNickname = atom({
  key: 'UserNickname',
  default: '사용자닉네임',
});

export const UserFont = atom({
  key: 'UserFont',
  default: 'Gomsin',
});

export const FontList = atom({
  key: 'fontListState',
  default: ['Gomsin', 'GangwonEduAll'],
});

export const UserKeyringList = atom({
  key: 'UserKeyringlist',
  default: [
    {
      keyringId: 111111,
      keyringName: '키링이름1',
      tagCode: '',
      imageUrl: '',
      lastSentTime: '2025-03-26T11:08:27.783Z',
      totalMessageCount: 10,
      scheduledCount: 1,
      timeCapsuleCount: 1,
      secretCount: 1,
      favorite: true,
    },
    {
      keyringId: 222222,
      keyringName: '키링이름2',
      tagCode: '',
      imageUrl: '',
      lastSentTime: '2025-03-24T11:08:27.783Z',
      totalMessageCount: 20,
      scheduledCount: 5,
      timeCapsuleCount: 5,
      secretCount: 5,
      favorite: true,
    },
    {
      keyringId: 333333,
      keyringName: '키링이름3',
      tagCode: '',
      imageUrl: '',
      lastSentTime: '2025-03-25T11:08:27.783Z',
      totalMessageCount: 30,
      scheduledCount: 10,
      timeCapsuleCount: 3,
      secretCount: 3,
      favorite: false,
    },
    {
      keyringId: 444444,
      keyringName: '키링이름4',
      tagCode: '',
      imageUrl: '',
      lastSentTime: '2025-03-24T11:08:27.783Z',
      totalMessageCount: 30,
      scheduledCount: 10,
      timeCapsuleCount: 3,
      secretCount: 3,
      favorite: false,
    },
  ],
});
