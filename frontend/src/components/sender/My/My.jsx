import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcArrowRight, IcCheckCircle, IcPen, IcSetting } from '../../../assets/icons';
import KeyringList from './KeyringList';
import NickNameSetting from './NickNameSetting';

const keyringList = [
  {
    id: 1,
    name: '우체통1',
    lastDate: 1,
    sentMailCount: 3,
    sentTimerMailCount: 2,
    sentAlarmMailCount: 1,
    setSecretMailCount: 1,
    isFaivorite: true,
  },
  {
    id: 2,
    name: '우체통2',
    lastDate: 2,
    sentMailCount: 33,
    sentTimerMailCount: 21,
    sentAlarmMailCount: 13,
    setSecretMailCount: 12,
    isFaivorite: false,
  },
  {
    id: 3,
    name: '우체통3',
    lastDate: 3,
    sentMailCount: 3,
    sentTimerMailCount: 3,
    sentAlarmMailCount: 3,
    setSecretMailCount: 3,
    isFaivorite: false,
  },
];

const My = () => {
  const [nickName, setNickName] = useState('NaNa');
  const [font, setFont] = useState('GangwonEduAll');
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const handleEditNickname = (newName) => {
    setNickName(newName);
    setIsEditing(false);
    console.log('닉네임 수정됨 : ', newName);
  };

  const handleChangeFont = () => {
    console.log('폰트 변경');
    navigate('font');
  };

  const handleKeyringSetting = () => {
    console.log('키링 설정');
    navigate('keyring');
  };

  return (
    <StMyWrapper>
      <Title>닉네임</Title>
      <NickNameSetting
        value={nickName}
        isEditing={isEditing}
        icon={isEditing ? IcCheckCircle : IcPen}
        onStartEdit={() => setIsEditing(true)}
        onIconClick={handleEditNickname}
      />
      <Title>폰트</Title>
      <FontPreviewBox>
        {font}
        <IcArrowRight style={{ cursor: 'pointer' }} onClick={handleChangeFont} />
      </FontPreviewBox>
      <br />
      <Title>
        키링
        <IcSetting style={{ cursor: 'pointer' }} onClick={handleKeyringSetting} />
      </Title>
      <KeyringList keyringArr={keyringList} />
    </StMyWrapper>
  );
};

export default My;

const StMyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 5rem;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Title2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 3rem;
  box-sizing: border-box;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const FontPreviewBox = styled.div`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Saeum3};
  background-color: ${({ theme }) => theme.colors.White};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 1rem 3rem 0.75rem 3rem;
  border-radius: 1rem;
  box-sizing: border-box;
`;
