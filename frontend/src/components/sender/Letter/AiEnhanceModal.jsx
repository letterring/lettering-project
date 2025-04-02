import React from 'react';
import styled from 'styled-components';

import AiImg from '/src/assets/images/ai_enhance.png';

const AiEnhanceModal = ({ onClose, font, tips }) => {
  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>
          <img src={AiImg} alt="AI" />
          <GuideText>
            마음을 더 잘 전할 수 있도록 <br />
            이런 얘기는 어때요?
          </GuideText>
        </Header>

        <TipList>
          {tips.map((tip, index) => (
            <TipCard key={index}>
              <TipTitle>{tip.title}</TipTitle>
              <TipBubble $font={font}>{tip.text}</TipBubble>
            </TipCard>
          ))}
        </TipList>
      </Content>
    </Overlay>
  );
};

export default AiEnhanceModal;

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
  padding-bottom: 4.5rem;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  flex: 1;
  width: 100%;
  gap: 1rem;
  padding: 1rem 0;
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

const TipList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
`;

const TipCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TipTitle = styled.div`
  ${({ theme }) => theme.fonts.Title6};
  color: ${({ theme }) => theme.colors.Gray0};
`;

const TipBubble = styled.div`
  background: #fdf4f4;
  border-radius: 1.2rem;
  padding: 1.2rem;
  ${({ theme, $font }) => theme.fonts[$font]};
  color: ${({ theme }) => theme.colors.Gray0};
`;
