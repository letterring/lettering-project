import React, { useState } from 'react';
import styled from 'styled-components';

import AiButtonImage from '/src/assets/images/ai_button.png';

const AiButton = ({ onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const openModal = (type) => {
    onOpenModal(type);
    setIsMenuOpen(false);
  };

  return (
    <FloatingContainer>
      <FloatingButton onClick={toggleMenu}>
        <img src={AiButtonImage} alt="AI 버튼" />
      </FloatingButton>

      {isMenuOpen && (
        <MenuWrapper>
          {/* <MenuCard onClick={() => openModal('add')}>
            <MenuTitle>내용 추가하기</MenuTitle>
            <MenuDescription>작성한 글, 사진 기반 내용 추천</MenuDescription>
          </MenuCard> */}
          <MenuCard onClick={() => openModal('edit')}>
            <MenuTitle>문장 고치기</MenuTitle>
            <MenuDescription>더 다채로운 문장으로 다듬기</MenuDescription>
          </MenuCard>
        </MenuWrapper>
      )}
    </FloatingContainer>
  );
};

export default AiButton;

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  z-index: 20;
`;

const FloatingButton = styled.button`
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  background-color: white;
  border: none;
  box-shadow: 0.1rem 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 21;

  img {
    width: 70%;
    height: auto;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-right: 1rem;
`;

const MenuCard = styled.button`
  background: white;
  border: none;
  border-radius: 5rem;
  padding: 1rem 1.5rem;
  box-shadow: 0.1rem 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 22rem;
`;

const MenuTitle = styled.div`
  ${({ theme }) => theme.fonts.Title5};
  color: ${({ theme }) => theme.colors.Gray0};
  margin-bottom: 0.4rem;
`;

const MenuDescription = styled.div`
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Gray1};
`;
