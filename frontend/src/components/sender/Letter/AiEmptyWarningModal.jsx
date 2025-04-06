import React from 'react';
import styled from 'styled-components';

import AiImg from '/src/assets/images/ai_refine.png'; // 기존 이미지 그대로 사용

const EmptyWarningModal = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>
          <img src={AiImg} alt="AI" />
          <GuideText>
            해당 페이지에 <br />
            내용을 모두 입력해주세요.
          </GuideText>
        </Header>
        <Buttons>
          <FilledButton onClick={onClose}>확인</FilledButton>
        </Buttons>
      </Content>
    </Overlay>
  );
};

export default EmptyWarningModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const Content = styled.div`
  background: white;
  padding: 2.4rem;
  margin: 2rem;
  border-radius: 1.5rem;
  width: 25rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  margin-top: 1rem;

  img {
    width: 5rem;
  }
`;

const GuideText = styled.div`
  ${({ theme }) => theme.fonts.Body2};
  color: ${({ theme }) => theme.colors.Gray0};
  text-align: left;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: flex-end;
`;

const FilledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 2rem;
  background: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Body2};
  color: white;
  cursor: pointer;
`;
