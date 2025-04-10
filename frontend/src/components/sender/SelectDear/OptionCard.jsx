import React from 'react';
import styled from 'styled-components';

import { ReactComponent as StarIcon } from '../../../assets/icons/ic_star.svg';
import { getRelativeDate } from '../../../util/getRelativeDate';

const OptionCard = ({ keyring }) => {
  return (
    <>
      <CardWrapper key={keyring.keyringId} $isFavorite={keyring.favorite}>
        <CardHeader>
          {keyring.favorite && (
            <FavoriteMark $isFavorite={keyring.favorite}>
              <StarIcon />
            </FavoriteMark>
          )}
          <LastDate>{keyring.lastSentTime ? getRelativeDate(keyring.lastSentTime) : ''}</LastDate>
        </CardHeader>

        {/* ✅ 키링 이미지 */}
        <CardContent>
          <KeyringImage src={keyring.imageUrl} alt="키링 이미지" />
          <Nickname>{keyring.nfcName}</Nickname>
        </CardContent>
      </CardWrapper>
    </>
  );
};

export default OptionCard;

const CardWrapper = styled.div`
  min-width: 25rem;
  height: 30rem;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.White};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  transition: transform 0.3s ease;
  margin-bottom: 2rem;
`;

const CardHeader = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const FavoriteMark = styled.div`
  width: 3rem;
  height: 2rem;
  color: ${({ $isFavorite, theme }) => ($isFavorite ? theme.colors.KakaoBG : theme.colors.Gray5)};
  position: absolute;
  left: 1rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const LastDate = styled.div`
  color: ${({ theme }) => theme.colors.Gray4};
  ${({ theme }) => theme.fonts.Saeum4};
  position: absolute;
  right: 1rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const KeyringImage = styled.img`
  height: 17rem;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
  margin-top: 3rem;
`;

const Nickname = styled.div`
  color: ${({ theme }) => theme.colors.Gray2};
  ${({ theme }) => theme.fonts.Saeum0};
`;
