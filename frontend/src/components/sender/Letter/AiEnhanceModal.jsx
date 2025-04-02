import React from 'react';
import styled from 'styled-components';

const AiEnhanceModal = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <img src="/src/assets/images/ai_letter.png" alt="AI" />
          <GuideText>
            마음을 더 잘 전할 수 있도록 <br />
            이런 얘기는 어때요?
          </GuideText>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <TipList>
          <TipCard>
            <TipTitle>사진이 담고 있는 순간을 표현하기</TipTitle>
            <TipBubble>
              "이 사진 속 우리, 해질 무렵 바다를 배경으로 웃고 있었지. 그때 네 얼굴을 보고 얼마나
              행복했는지 몰라."
            </TipBubble>
          </TipCard>

          <TipCard>
            <TipTitle>사진에 얽힌 에피소드나 비하인드 이야기</TipTitle>
            <TipBubble>
              "사진 찍으려고 포즈 잡는데 갑자기 바람 불어서 네 머리 휘날리던 거 아직도 생각나 ㅋㅋ
              그 모습까지 너무 예뻤어."
            </TipBubble>
          </TipCard>

          <TipCard>
            <TipTitle>같은 장소에서의 미래를 상상해보기</TipTitle>
            <TipBubble>
              "나중에 저 장소에 다시 가게 되면, 이번엔 손 꼭 잡고 더 많은 걸 나누고 싶어."
            </TipBubble>
          </TipCard>
        </TipList>
      </Content>
    </Overlay>
  );
};

export default AiEnhanceModal;

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
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
`;

const TipBubble = styled.div`
  background: #fdf4f4;
  border-radius: 1.2rem;
  padding: 1.2rem;
  font-size: 1.3rem;
  line-height: 1.6;
  color: #333;
`;
