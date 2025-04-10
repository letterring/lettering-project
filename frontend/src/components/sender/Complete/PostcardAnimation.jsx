import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import DummyImg from '/src/assets/dummy/postcard.jpg';

import EnvelopeBottomImg from '../../../assets/images/postcard/bottom_fold.png';
import EnvelopeBodyImg from '../../../assets/images/postcard/envelope_body.png';
import SealingWaxImg from '../../../assets/images/postcard/envelope_wax.png';
import PostcardImg from '../../../assets/images/postcard/postcard_paper.png';
import EnvelopeTopPartImg from '../../../assets/images/postcard/top_fold_part.png';

const PostcardAnimation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstImageURL = location.state?.firstImageURL;
  const [isClosed, setIsClosed] = useState(false);

  const angle = (90 + 3.71) * (Math.PI / 180); // 라디안 변환
  const distance = 120;

  const x = -Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  // const x = 0;
  // const y = 0;

  return (
    <StWrapper>
      <StEnvelopeWrapper>
        <StEnvelopeTop $isClosed={isClosed} src={EnvelopeTopPartImg} alt="편지 봉투 윗부분" />
        <StEnvelopeBody $isClosed={isClosed} src={EnvelopeBodyImg} alt="편지 봉투 바닥" />

        <StPostcard
          src={PostcardImg}
          alt="엽서"
          initial={{ y: 0, x: 0, opacity: 1 }}
          animate={{ x, y, opacity: 1 }}
          transition={{ duration: 2.5 }}
        />
        <StPostcardImage
          src={firstImageURL}
          alt="엽서사진"
          initial={{ y: 0, x: 0, opacity: 1, rotate: -3.3 }}
          animate={{ x, y, opacity: 1, rotate: -3.3 }}
          transition={{ duration: 2.5 }}
          onAnimationComplete={() => {
            setIsClosed(true);
            setTimeout(() => {
              navigate('/complete');
            }, 4400);
          }}
        />
        <StEnvelope src={EnvelopeBottomImg} alt="편지 봉투" />
        <StSealingWax src={SealingWaxImg} alt="실링왁스" />
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
  width: 33.8rem;
  height: 16rem;
  top: -13.5rem;
  left: -2.4rem;
  z-index: ${({ $isClosed }) => ($isClosed ? 8 : 1)};

  transform-origin: bottom center;
  transform: ${({ $isClosed }) =>
    $isClosed ? 'rotateZ(-4deg) rotateX(180deg)' : 'rotateZ(-4deg) rotateX(0deg)'};
  transition: transform 4s ease;
`;
const StEnvelopeBody = styled.img`
  position: absolute;
  width: 29.2rem;
  top: 1.5rem;
  left: 0.5rem;
  z-index: 1;
`;

const StPostcard = styled(motion.img)`
  position: absolute;
  left: -0.1rem;
  top: -8rem;
  width: 29rem;
  height: 20rem;
  z-index: 2;
`;

const StPostcardImage = styled(motion.img)`
  position: absolute;
  top: -6.9rem;
  left: 1rem;
  width: 26.7rem;
  height: 17.6rem;
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
  width: 9rem;
  top: 9.3rem;
  left: 10.8rem;
  z-index: 100;
  /* display: ${({ $isClosed }) => ($isClosed ? 'block' : 'none')}; */
`;
