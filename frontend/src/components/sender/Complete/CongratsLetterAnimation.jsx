import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import EnvelopeBottomImg from '../../../assets/images/congratsLetter/bottom_fold.png';
import EnvelopeBodyImg from '../../../assets/images/congratsLetter/envelope_body.png';
import EnvelopeTopPartImg from '../../../assets/images/congratsLetter/envelope_top_part.png';
import LetterImg from '../../../assets/images/congratsLetter/letter_paper_crop.png';
import SealingWaxImg from '../../../assets/images/congratsLetter/sealing_wax.png';

const CongratsLetterAnimation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstImageURL = location.state?.firstImageURL;
  const [isClosed, setIsClosed] = useState(false);

  const angle = (90 + 3.71) * (Math.PI / 180); // 라디안 변환
  const distance = 130;

  const x = -Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <StWrapper>
      <StEnvelopeWrapper>
        <StEnvelopeTop $isClosed={isClosed} src={EnvelopeTopPartImg} alt="편지 봉투 윗부분" />
        <StEnvelopeBody src={EnvelopeBodyImg} alt="편지 봉투 바닥" />
        <StLetterClipArea>
          <StLetter
            src={LetterImg}
            initial={{ y: 0, x: 0, opacity: 1 }}
            animate={{ x, y, opacity: 1 }}
            transition={{ duration: 2 }}
          />
          <StLetterImage
            src={firstImageURL}
            initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
            animate={{ x, y, opacity: 1, rotate: -3.7 }}
            transition={{ duration: 2 }}
            onAnimationComplete={() => {
              setIsClosed(true);
              setTimeout(() => {
                navigate('/complete');
              }, 4500);
            }}
          />
        </StLetterClipArea>

        <StEnvelope src={EnvelopeBottomImg} alt="편지 봉투" />
        <StSealingWax src={SealingWaxImg} alt="실링왁스" />
      </StEnvelopeWrapper>
    </StWrapper>
  );
};

export default CongratsLetterAnimation;

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
  top: -9.3rem;
  left: -2.4rem;
  z-index: ${({ $isClosed }) => ($isClosed ? 8 : 1)};

  transform-origin: bottom center;
  transform: ${({ $isClosed }) =>
    $isClosed ? 'rotateZ(-3.71deg) rotateX(180deg)' : 'rotateZ(-3.71deg) rotateX(0deg)'};
  transition: transform 5s ease;
`;

const StEnvelopeBody = styled.img`
  position: absolute;
  width: 33.7rem;
  top: -0.5rem;
  left: -2.2rem;
  z-index: 1;
`;

const StLetterClipArea = styled.div`
  position: absolute;
  left: -0.1rem;
  top: 0rem;
  width: 30rem;
  /* overflow: hidden; */
  z-index: 4;
  pointer-events: none;
`;

const StLetter = styled(motion.img)`
  position: absolute;
  left: 1rem;
  top: -10rem;
  width: 26rem;
  /* height: 30rem; */
  z-index: 2;

  object-fit: cover;
`;

const StLetterImage = styled(motion.img)`
  position: absolute;
  top: -6.5rem;
  left: 7.3rem;
  width: 13.5rem;
  height: 13.5rem;
  object-fit: cover;
  z-index: 3;
`;

const StEnvelope = styled.img`
  position: absolute;
  width: 31rem;
  top: 1rem;
  z-index: 5;
`;

const StSealingWax = styled.img`
  position: absolute;
  width: 9.2rem;
  top: 7.7rem;
  left: 10.7rem;
  z-index: 100;
  /* display: ${({ $isClosed }) => ($isClosed ? 'block' : 'none')}; */
`;
