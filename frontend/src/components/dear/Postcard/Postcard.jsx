import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DummyImg from '../../../assets/dummy/postcard.jpg';
import EnvelopeBottomImg from '../../../assets/images/postcard/bottom_fold.png';
import PostcardImg from '../../../assets/images/postcard/postcard_paper.png';
import EnvelopeTopImg from '../../../assets/images/postcard/top_fold.png';

const Postcard = () => {
  const navigate = useNavigate();

  const angle = (90 + 3.71) * (Math.PI / 180); // 라디안 변환
  const distance = 80;

  const x = Math.cos(angle) * distance;
  const y = -Math.sin(angle) * distance;

  return (
    <StWrapper>
      <StEnvelopeWrapper onClick={() => navigate('/dear/postcard/detail')}>
        <StEnvelopeTop src={EnvelopeTopImg} alt="편지 봉투 윗부분" />

        <StPostcard
          src={PostcardImg}
          alt="엽서"
          initial={{ y: 0, x: 0, opacity: 1 }}
          animate={{ x, y, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <StPostcardImage
          src={DummyImg}
          alt="엽서사진"
          initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
          animate={{ x, y, opacity: 1, rotate: -3.7 }}
          transition={{ duration: 1.2 }}
          // onAnimationComplete={() => {
          //   setTimeout(() => {
          //     navigate('/dear/postcard/detail');
          //   }, 800); // 1초 뒤 이동
          // }}
        />
        <StEnvelope src={EnvelopeBottomImg} alt="편지 봉투" />
        <StBlankWhite />
      </StEnvelopeWrapper>
    </StWrapper>
  );
};

export default Postcard;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
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
  left: 0.8rem;
  top: 1rem;
  width: 29rem;
  z-index: 2;
`;

const StPostcardImage = styled(motion.img)`
  position: absolute;
  top: 2.45rem;
  left: 2rem;
  width: 26.4rem;
  z-index: 3;
`;

const StBlankWhite = styled.div`
  position: absolute;
  background-color: white;
  width: 31rem;
  height: 20rem;
  top: 12rem;
  z-index: 4;
  transform: rotate(-3.71deg);
`;

const StEnvelope = styled.img`
  position: absolute;
  width: 31rem;
  top: 1rem;
  z-index: 5;
`;
