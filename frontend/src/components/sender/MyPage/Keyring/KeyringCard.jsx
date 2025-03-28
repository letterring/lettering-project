// KeyringCard.jsx
import React from 'react';
import styled from 'styled-components';

import { IcAlarmClock, IcEnvelop, IcLock, IcStar, IcTimeQuarter } from '../../../../assets/icons';
import PostBoxImg from '../../../../assets/images/postBox.png';
import { getRelativeDate } from '../../../../util/getRelativeDate';

const KeyringCard = ({ keyring }) => {
  const {
    tagCode,
    keyringName,
    lastSentTime,
    totalMessageCount,
    scheduledCount,
    timeCapsuleCount,
    secretCount,
    favorite,
  } = keyring;

  return (
    <StCardWrapper>
      <CardHeader>
        <IcStar style={{ color: favorite ? '#FFD600' : '#D3D3D3' }} />
        <LastDateText>{getRelativeDate(lastSentTime)}</LastDateText>
      </CardHeader>

      <PostBoxImage src={PostBoxImg} alt="우체통" />
      <Nickname>{keyringName}</Nickname>
      <SubText>{tagCode}</SubText>

      <InfoGrid>
        <InfoBox>
          <IcEnvelop />
          <span>{totalMessageCount}</span>
        </InfoBox>
        <InfoBox>
          <IcTimeQuarter />
          <span>{scheduledCount}</span>
        </InfoBox>
        <InfoBox>
          <IcAlarmClock />
          <span>{timeCapsuleCount}</span>
        </InfoBox>
        <InfoBox>
          <IcLock />
          <span>{secretCount}</span>
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
