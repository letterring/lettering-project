import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AiImg from '/src/assets/images/ai_refine.png';

const AiRefineModal = ({ onClose, font }) => {
  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>
          <img src={AiImg} alt="AI" />
          <GuideText>
            이런 표현을 더해보면, <br />
            마음이 더 잘 전해질 거예요.
          </GuideText>
        </Header>

        <SuggestionBubble $font={font}>
          오늘 아침 눈을 뜨자마자 달력을 보니 우리 기념일이라는 사실에 마음이 설렌다...
        </SuggestionBubble>

        <Buttons>
          <OutlinedButton>다시 추천받기</OutlinedButton>
          <FilledButton>사용하기</FilledButton>
        </Buttons>
      </Content>
    </Overlay>
  );
};

export default AiRefineModal;

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
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: left;
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

const SuggestionBubble = styled.div`
  background: #f9f9f9;
  padding: 1.6rem;
  border-radius: 1.6rem;
  ${({ theme, $font }) => theme.fonts[$font]};
  color: ${({ theme }) => theme.colors.Gray0};
  box-shadow: 0.1rem 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: flex-end;
`;

const OutlinedButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #999;
  border-radius: 2rem;
  background: white;
  ${({ theme }) => theme.fonts.Body2};
  color: ${({ theme }) => theme.colors.Gray0};
`;

const FilledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 2rem;
  background: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Body2};
  color: white;
`;
