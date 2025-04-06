import React from 'react';
import styled from 'styled-components';

import { ReactComponent as StarIcon } from '../../../assets/icons/ic_star.svg';

const OptionCard = ({ keyring }) => {
  return (
    <>
      <CardWrapper key={keyring.keyringId} $isFavorite={keyring.favorite}>
        <CardHeader>
          <FavoriteMark $isFavorite={keyring.favorite}>
            <StarIcon />
          </FavoriteMark>
        </CardHeader>

        {/* ✅ 키링 이미지 */}
        <CardContent>
          <KeyringImage src={keyring.imageUrl} alt="키링 이미지" />
          <Nickname>{keyring.nfcName}</Nickname>
          <TagCode>{keyring.tagCode}</TagCode>
        </CardContent>
      </CardWrapper>
    </>
  );
};

export default OptionCard;

const CardWrapper = styled.div`
  min-width: 25rem;
  height: 33rem;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FavoriteMark = styled.div`
  width: 3rem;
  height: 3rem;
  margin-top: 3rem;
  color: ${({ $isFavorite, theme }) => ($isFavorite ? theme.colors.KakaoBG : theme.colors.Gray5)};

  svg {
    width: 100%;
    height: 100%;
  }
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

const TagCode = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.Gray4};
  margin-bottom: 3rem;
`;
