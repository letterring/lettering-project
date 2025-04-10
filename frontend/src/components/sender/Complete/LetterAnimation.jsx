import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import DummyImg from '/src/assets/dummy/postcard.jpg';

import EnvelopeBottomImg from '../../../assets/images/letter/bottom_fold.png';
import EnvelopeBodyImg from '../../../assets/images/letter/envelope_body.png';
import EnvelopeTopPartImg from '../../../assets/images/letter/envelope_top_part.png';
import LetterImg from '../../../assets/images/letter/letter_paper_crop2.png';
import LetteringImg from '../../../assets/images/letter/lettering.png';
import SealingWaxImg from '../../../assets/images/letter/sealing_wax.png';
import StampImg from '../../../assets/images/letter/vintage_stamp.png';
const LetterAnimation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstImageURL = location.state?.firstImageURL;
  const [isClosed, setIsClosed] = useState(false);

  const angle = (90 + 3.71) * (Math.PI / 180); // 라디안 변환
  const distance = 130;

  const x = -Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  // const x = 0;
  // const y = 0;

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
            transition={{ duration: 3 }}
          />
          <StLetterImage
            src={firstImageURL}
            initial={{ y: 0, x: 0, opacity: 1 }}
            animate={{ x, y, opacity: 1 }}
            transition={{ duration: 3 }}
            onAnimationComplete={() => {
              setIsClosed(true);
              setTimeout(() => {
                navigate('/complete');
              }, 4500);
            }}
          />
          <StStampImage
            src={StampImg}
            initial={{ y: 0, x: 0, opacity: 1 }}
            animate={{ x, y, opacity: 1 }}
            transition={{ duration: 3 }}
          />
          <StTextImage
            src={LetteringImg}
            initial={{ y: 0, x: 0, opacity: 1 }}
            animate={{ x, y, opacity: 1 }}
            transition={{ duration: 3 }}
          />
        </StLetterClipArea>

        <StEnvelope src={EnvelopeBottomImg} alt="편지 봉투" />
        <StSealingWax src={SealingWaxImg} alt="실링왁스" />
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
  height: 16rem;
  top: -13.5rem;
  left: -2.4rem;
  z-index: ${({ $isClosed }) => ($isClosed ? 8 : 1)};

  transform-origin: bottom center;
  transform: ${({ $isClosed }) =>
    $isClosed ? 'rotateZ(-3.7deg) rotateX(180deg)' : 'rotateZ(-3.7deg) rotateX(0deg)'};
  transition: transform 3s ease;
`;

const StEnvelopeBody = styled.img`
  position: absolute;
  width: 29rem;
  top: 1.5rem;
  left: 0.5rem;
  z-index: 1;
`;

const StLetterClipArea = styled.div`
  position: absolute;
  left: 0rem;
  bottom: -24rem;
  width: 28.5rem;
  height: 50rem;
  overflow: hidden;
  z-index: 4;
  pointer-events: none;
  transform: rotate(-3.7deg);
`;

const StLetter = styled(motion.img)`
  position: absolute;
  left: 0.8rem;
  top: 18rem;
  width: 26rem;
  height: 30rem;
  z-index: 2;

  object-fit: contain;
`;

const StStampImage = styled(motion.img)`
  position: absolute;
  top: 20rem;
  right: 5rem;
  width: 5rem;
  z-index: 4;
`;

const StTextImage = styled(motion.img)`
  position: absolute;
  top: 32rem;
  left: 0rem;
  width: 27.5rem;
  z-index: 4;
`;

const StLetterImage = styled(motion.img)`
  position: absolute;
  top: 23.2rem;
  left: 6rem;
  width: 15.5rem;
  height: 15.5rem;
  object-fit: cover;
  z-index: 3;
`;

const StEnvelope = styled.img`
  position: absolute;
  width: 31rem;
  height: 25rem;
  top: 1rem;
  z-index: 5;
`;

const StSealingWax = styled.img`
  position: absolute;
  width: 8rem;
  top: 9rem;
  left: 11.2rem;
  z-index: 100;
  /* display: ${({ $isClosed }) => ($isClosed ? 'block' : 'none')}; */
`;
