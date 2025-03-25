// KeyringCard.jsx
import React from 'react';
import styled from 'styled-components';

import { IcAlarmClock, IcEnvelop, IcLock, IcStar, IcTimeQuarter } from '../../../assets/icons';
import PostBoxImg from '../../../assets/images/postBox.png';

const KeyringCard = ({ keyring }) => {
  return (
    <StCardWrapper>
      <CardHeader>
        <IcStar style={{ color: keyring.isFaivorite ? '#FFD600' : '#D3D3D3' }} />
        <LastDateText>마지막 편지 {keyring.lastDate}일 전</LastDateText>
      </CardHeader>

      <PostBoxImage src={PostBoxImg} alt="우체통" />
      <Nickname>{keyring.name}</Nickname>
      <SubText>키링ID</SubText>

      <InfoGrid>
        <InfoBox>
          <IcEnvelop />
          <span>{keyring.sentMailCount}</span>
        </InfoBox>
        <InfoBox>
          <IcTimeQuarter />
          <span>{keyring.sentTimerMailCount}</span>
        </InfoBox>
        <InfoBox>
          <IcAlarmClock />
          <span>{keyring.sentAlarmMailCount}</span>
        </InfoBox>
        <InfoBox>
          <IcLock />
          <span>{keyring.setSecretMailCount}</span>
        </InfoBox>
      </InfoGrid>
    </StCardWrapper>
  );
};

export default KeyringCard;

const StCardWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.White};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const LastDateText = styled.div`
  color: ${({ theme }) => theme.colors.Gray4};
  ${({ theme }) => theme.fonts.Body3};
`;
const PostBoxImage = styled.img`
  width: 7rem;
  height: auto;
`;

const Nickname = styled.div`
  ${({ theme }) => theme.fonts.Saeum2};
  color: ${({ theme }) => theme.colors.Gray3};
`;

const SubText = styled.div`
  ${({ theme }) => theme.fonts.Body3};
  color: ${({ theme }) => theme.colors.Gray4};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: 100%;
  margin-top: 1rem;
`;

const InfoBox = styled.div`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Title2};
  background-color: ${({ theme }) => theme.colors.Gray6};
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 1.25rem;
  width: 7.6875rem;
  height: 2.5rem;
`;
