import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import DummyImg from '../../../assets/dummy/postcard.jpg';
import PostcardImg from '../../../assets/images/postcard/postcard.png';
import StampImg from '../../../assets/images/postcard/stamp.png';
import Header from '../../common/Header';
import ReplyComponent from './ReplyComponent';

const PostcardDetail = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <StPageWrapper>
      <Header headerName="Lettering" />

      <StFlipContainer onClick={() => setFlipped((prev) => !prev)}>
        <StFlipCard $flipped={flipped}>
          <StCardFace className="front">
            {/* <StPostcard src={PostcardImg} alt="엽서" /> */}
            <StPostcardWhite />
            <StPostcardImage>
              <img src={DummyImg} alt="엽서사진" />
            </StPostcardImage>
          </StCardFace>
          <StCardFace className="back">
            <StPostcard src={PostcardImg} alt="엽서" />
            <StPostcardContent>
              <StPostcardTitle>사랑하는 너에게,</StPostcardTitle>
              <StPostcardStamp src={StampImg} alt="우표" />
              <StPostcardText>
                오늘 아침 눈을 뜨자마자 달력을 보니 우리 기념일이라는 사실에 마음이 설렌다. 우리가
                함께 보낸 시간이 벌써 이렇게 쌓였다는 게 믿기지 않을 정도로 빠르게 느껴져. 처음
                만났던 순간부터 지금까지 함께한 모든 기억들이 하나둘 떠오르면서 마음이 참
                따뜻해졌어.
              </StPostcardText>
            </StPostcardContent>
          </StCardFace>
        </StFlipCard>
      </StFlipContainer>

      <ReplyComponent />
    </StPageWrapper>
  );
};

export default PostcardDetail;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StFlipContainer = styled.div`
  perspective: 100rem;
  width: 30rem;
  height: 23rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7rem;
`;

const StFlipCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  cursor: pointer;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const StCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;

  &.front {
    z-index: 2;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.back {
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

const StPostcard = styled.img`
  position: absolute;
  width: 29rem;
  z-index: 2;
`;

const StPostcardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 3rem;
  z-index: 3;
`;

const StPostcardTitle = styled.div`
  ${({ theme }) => theme.fonts.Gomsin2};
  margin-bottom: 3rem;
  z-index: 3;
`;

const StPostcardStamp = styled.img`
  position: absolute;
  width: 10rem;
  top: 1rem;
  right: 2rem;
  border-radius: 50%;
  z-index: 3;
`;

const StPostcardText = styled.div`
  ${({ theme }) => theme.fonts.Gomsin2};
  word-wrap: break-word;
  max-height: 13rem;
  overflow: auto;
  white-space: normal;
  z-index: 3;
`;

const StPostcardWhite = styled.img`
  position: absolute;
  width: 100%;
  z-index: 2;
  background-color: white;
`;
const StPostcardImage = styled(motion.div)`
  position: absolute;
  top: 0.9rem;
  left: 0.8rem;
  width: 28.3rem;
  height: 21rem;
  z-index: 3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
