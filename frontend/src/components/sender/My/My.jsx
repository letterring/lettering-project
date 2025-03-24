import React from 'react';
import styled from 'styled-components';

import { IcSetting } from '../../../assets/icons';
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
  },
  {
    id: 2,
    name: '우체통2',
    lastDate: 2,
    sentMailCount: 33,
    sentTimerMailCount: 21,
    sentAlarmMailCount: 13,
    setSecretMailCount: 12,
  },
  {
    id: 3,
    name: '우체통3',
    lastDate: 3,
    sentMailCount: 3,
    sentTimerMailCount: 3,
    sentAlarmMailCount: 3,
    setSecretMailCount: 3,
  },
];

const My = () => {
  return (
    <StMyWrapper>
      <Title>닉네임</Title>
      <SettingItem type="nickname" value="NaNa" />
      <Title>폰트</Title>
      <SettingItem type="font" value="GangwonEduAll" />
      <Title>
        키링
        <IcSetting />
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
  width: 23.4375rem;
  height: 100%;
  padding-left: 2.31rem;
  padding-right: 2.25rem;
  border: 1px solid ${({ theme }) => theme.colors.Gray1};
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Title2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 2.25rem;
  padding-left: 1rem;
`;
