import React from 'react';
import styled from 'styled-components';

const OptionCard = ({ keyring }) => {
  return (
    <>
      <CardWrapper key={keyring.keyringId} isFavorite={keyring.favorite}>
        <CardHeader>
          <FavoriteMark isFavorite={keyring.favorite}>
            {keyring.favorite ? '❤️' : '🤍'}
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
  height: 30rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.White};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
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
  font-size: 20px;
  color: ${({ isFavorite }) => (isFavorite ? '#ff4d4f' : '#d3d3d3')};
`;

const LastDateText = styled.div`
  color: ${({ theme }) => theme.colors.Gray4};
  font-size: 12px;
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
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
`;

const Nickname = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.Gray3};
  margin-bottom: 4px;
`;

const TagCode = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.Gray4};
`;
