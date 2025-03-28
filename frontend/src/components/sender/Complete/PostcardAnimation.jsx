import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DummyImg from '../../../assets/dummy/postcard.jpg';
import EnvelopeBottomImg from '../../../assets/images/postcard/bottom_fold.png';
import PostcardImg from '../../../assets/images/postcard/postcard_paper.png';
import EnvelopeTopImg from '../../../assets/images/postcard/top_fold.png';

const PostcardAnimation = () => {
  const navigate = useNavigate();

  const angle = (90 + 3.71) * (Math.PI / 180); // 라디안 변환
  const distance = 120;

  const x = -Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <StWrapper>
      <StEnvelopeWrapper onClick={() => navigate('/dear/postcard/detail')}>
        <StEnvelopeTop src={EnvelopeTopImg} alt="편지 봉투 윗부분" />

        <StPostcard
          src={PostcardImg}
          alt="엽서"
          initial={{ y: 0, x: 0, opacity: 1 }}
          animate={{ x, y, opacity: 1 }}
          transition={{ duration: 2 }}
        />
        <StPostcardImage
          src={DummyImg}
          alt="엽서사진"
          initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
          animate={{ x, y, opacity: 1, rotate: -3.7 }}
          transition={{ duration: 2 }}
          onAnimationComplete={() => {
            setTimeout(() => {
              navigate('/complete');
            }, 800);
          }}
        />
        <StEnvelope src={EnvelopeBottomImg} alt="편지 봉투" />
      </StEnvelopeWrapper>
    </StWrapper>
  );
};

export default PostcardAnimation;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StEnvelopeWrapper = styled.div`
  position: relative;
  width: 30rem;
  height: auto;
  transform: translateY(-5rem);
`;

const StEnvelopeTop = styled.img`
  position: absolute;
  width: 34rem;
  top: -9.5rem;
  left: -2.4rem;
  z-index: 1;
`;

const StPostcard = styled(motion.img)`
  position: absolute;
  left: -0.1rem;
  top: -12rem;
  width: 29rem;
  height: 23rem;
  z-index: 2;
`;

const StPostcardImage = styled(motion.img)`
  position: absolute;
  top: -10.6rem;
  left: 1.15rem;
  width: 26.4rem;
  height: 20.2rem;
  object-fit: cover;
  z-index: 3;
`;

const StEnvelope = styled.img`
  position: absolute;
  width: 31rem;
  top: 1rem;
  z-index: 5;
`;
