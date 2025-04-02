import React from 'react';
import styled from 'styled-components';

const AiRefineModal = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <img src="/src/assets/images/ai_letter.png" alt="AI" />
          <GuideText>
            이런 표현을 더해보면, <br />
            마음이 더 잘 전해질 거예요.
          </GuideText>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <SuggestionBubble>
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

// 스타일 정의
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
  border-radius: 1.6rem;
  width: 34rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  img {
    width: 5rem;
    margin-bottom: 1rem;
  }
`;

const GuideText = styled.div`
  font-size: 1.4rem;
  color: #333;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const SuggestionBubble = styled.div`
  background: #f9f9f9;
  padding: 1.6rem;
  border-radius: 1.6rem;
  font-size: 1.3rem;
  line-height: 1.6;
  color: #333;
  box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.1);
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;
`;

const OutlinedButton = styled.button`
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: 1px solid #999;
  border-radius: 2rem;
  background: white;
  font-size: 1.3rem;
  color: #333;
`;

const FilledButton = styled.button`
  flex: 1;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 2rem;
  background: #de5246;
  font-size: 1.3rem;
  color: white;
`;
