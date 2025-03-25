import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcArrowRight, IcPen, IcSetting } from '../../../assets/icons';
import KeyringList from './KeyringList';
import SettingItem from './SettingItem';

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

const nickName = 'NaNa';
const font = 'GangwonEduAll';

const My = () => {
  const navigate = useNavigate();

  const handleEditNickname = () => {
    console.log('닉네임 수정');
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
      <SettingItem value={nickName} icon={IcPen} onIconClick={handleEditNickname} />
      <Title>폰트</Title>
      <SettingItem value={font} icon={IcArrowRight} onIconClick={handleChangeFont} />
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
  justify-content: center;
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
