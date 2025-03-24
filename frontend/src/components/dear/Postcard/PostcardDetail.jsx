import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import DummyImg from '../../../assets/dummy/postcard.jpg';
import PostcardImg from '../../../assets/icons/postcard/postcard.png';

const PostcardDetail = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <StPageWrapper>
      <StFlipContainer onClick={() => setFlipped((prev) => !prev)}>
        <StFlipCard $flipped={flipped}>
          <StCardFace className="front">
            <StPostcard src={PostcardImg} alt="엽서" />
            <StPostcardImage>
              <img src={DummyImg} alt="엽서사진" />
            </StPostcardImage>
          </StCardFace>
          <StCardFace className="back">
            <StPostcard src={PostcardImg} alt="엽서" />
          </StCardFace>
        </StFlipCard>
      </StFlipContainer>
    </StPageWrapper>
  );
};

export default PostcardDetail;

const StPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StFlipContainer = styled.div`
  perspective: 1000px;
  width: 30rem;
  height: 22rem;
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
    background-color: white;
    z-index: 2;
  }

  &.back {
    background-color: white;
    transform: rotateY(180deg);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StPostcard = styled.img`
  position: absolute;
  width: 29rem;
  z-index: 2;
`;
const StPostcardImage = styled.div`
  position: absolute;
  top: 0.4rem;
  left: 0.9rem;
  width: 28rem;
  height: 20.8rem;
  z-index: 3;

  img {
    width: 100%;
    height: 100%;
  }
`;
