import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DummyImg from '../../../assets/dummy/letter.jpg';
import EnvelopeBottomImg from '../../../assets/images/letter/bottom_fold.png';
import LetterImg from '../../../assets/images/letter/letter_paper.png';
import LetteringImg from '../../../assets/images/letter/lettering.png';
import EnvelopeTopImg from '../../../assets/images/letter/top_fold.png';
import StampImg from '../../../assets/images/letter/vintage_stamp.png';

const LetterAnimation = () => {
  const navigate = useNavigate();

  const angle = (90 + 3.71) * (Math.PI / 180); // 라디안 변환
  const distance = 200;

  const x = -Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <StWrapper>
      <StEnvelopeWrapper onClick={() => navigate('/dear/letter/detail')}>
        <StEnvelopeTop src={EnvelopeTopImg} alt="편지 봉투 윗부분" />

        <StLetter
          src={LetterImg}
          alt="편지지"
          initial={{ y: 0, x: 0, opacity: 1 }}
          animate={{ x, y, opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <StLetterImage
          src={DummyImg}
          alt="편지 사진"
          initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
          animate={{ x, y, opacity: 1, rotate: -3.7 }}
          transition={{ duration: 1.2 }}
          onAnimationComplete={() => {
            setTimeout(() => {
              navigate('/complete');
            }, 800);
          }}
        />

        <StStampImage
          src={StampImg}
          alt="스탬프"
          initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
          animate={{ x, y, opacity: 1, rotate: -3.7 }}
          transition={{ duration: 1.2 }}
        />
        <StTextImage
          src={LetteringImg}
          alt="레터링"
          initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
          animate={{ x, y, opacity: 1, rotate: -3.7 }}
          transition={{ duration: 1.2 }}
        />
        <StEnvelope src={EnvelopeBottomImg} alt="편지 봉투" />
      </StEnvelopeWrapper>
    </StWrapper>
  );
};

export default LetterAnimation;

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

const StLetter = styled(motion.img)`
  position: absolute;
  left: -0.7rem;
  top: -25rem;
  width: 29rem;
  z-index: 2;
`;

const StStampImage = styled(motion.img)`
  position: absolute;
  top: -22.5rem;
  right: 5.5rem;
  width: 6.5rem;
  z-index: 4;
`;

const StTextImage = styled(motion.img)`
  position: absolute;
  top: -8rem;
  left: 0rem;
  width: 29rem;
  z-index: 4;
`;

const StLetterImage = styled(motion.img)`
  position: absolute;
  top: -19rem;
  left: 5.2rem;
  width: 17.2rem;
  height: 17.2rem;
  object-fit: cover;
  z-index: 3;
`;

const StEnvelope = styled.img`
  position: absolute;
  width: 31rem;
  top: 1rem;
  z-index: 5;
`;
