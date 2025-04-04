import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DummyImg from '../../../assets/dummy/letter.jpg';
import EnvelopeBottomImg from '../../../assets/images/letter/bottom_fold.png';
import LetterImg from '../../../assets/images/letter/letter_paper.png';
import LetteringImg from '../../../assets/images/letter/lettering.png';
import StampImg from '../../../assets/images/letter/vintage_stamp.png';
import EnvelopeBodyImg from '../../../assets/images/postcard/envelope_body.png';
import SealingWaxImg from '../../../assets/images/postcard/envelope_wax.png';
import EnvelopeTopPartImg from '../../../assets/images/postcard/top_fold_part.png';

const LetterAnimation = () => {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);

  const angle = (90 + 3.71) * (Math.PI / 180); // 라디안 변환
  const distance = 300;

  const x = -Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <StWrapper>
      <StEnvelopeWrapper onClick={() => navigate('/dear/postcard/detail')}>
        <StEnvelopeTop $isClosed={isClosed} src={EnvelopeTopPartImg} alt="편지 봉투 윗부분" />
        <StEnvelopeBody src={EnvelopeBodyImg} alt="편지 봉투 바닥" />

        {/* 클리핑 */}
        <StLetterClipArea>
          <StLetterWrapper>
            <StLetter
              src={LetterImg}
              initial={{ y: 0, x: 0, opacity: 1 }}
              animate={{ x, y, opacity: 1 }}
              transition={{ duration: 2 }}
            />
            <StLetterImage
              src={DummyImg}
              initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
              animate={{ x, y, opacity: 1, rotate: -3.7 }}
              transition={{ duration: 2 }}
              onAnimationComplete={() => {
                setIsClosed(true);
                setTimeout(() => {
                  // navigate('/complete');
                }, 5000);
              }}
            />
            <StStampImage
              src={StampImg}
              initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
              animate={{ x, y, opacity: 1, rotate: -3.7 }}
              transition={{ duration: 2 }}
            />
            <StTextImage
              src={LetteringImg}
              initial={{ y: 0, x: 0, opacity: 1, rotate: -3.7 }}
              animate={{ x, y, opacity: 1, rotate: -3.7 }}
              transition={{ duration: 2 }}
            />
          </StLetterWrapper>
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
  width: 29rem;
  top: 1.5rem;
  left: 0.5rem;
  z-index: 1;
`;

const StLetterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30rem;
  height: 100rem; // 충분히 아래로 내려갈 수 있도록
  z-index: 3;
  pointer-events: none;
`;

const StLetterClipArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30rem;
  height: 20rem; // ✂️ 봉투 높이와 동일하게 설정
  overflow: hidden;
  z-index: 4;
  pointer-events: none;
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

const StSealingWax = styled.img`
  position: absolute;
  width: 8rem;
  top: 8.5rem;
  left: 11.3rem;
  z-index: 100;
  /* display: ${({ $isClosed }) => ($isClosed ? 'block' : 'none')}; */
`;
