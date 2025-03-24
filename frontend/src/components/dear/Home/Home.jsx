import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DearHomeImage from '../../../assets/icons/images/dear_home.png';

const Home = () => {
  const navigate = useNavigate();

  const appearVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <StPageWrapper>
      <StMotionFadeIn
        variants={appearVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <StTitle>Lettering</StTitle>
      </StMotionFadeIn>

      <StImageWrapper>
        <StImage layoutId="shared-postbox" src={DearHomeImage} alt="우체통 이미지" />
      </StImageWrapper>

      <StMotionFadeIn
        variants={appearVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <StButtonWrapper>
          {/* <StButton onClick={() => navigate('/dear/postcard')}>새로운 편지 보러가기</StButton> */}
          <StButton onClick={() => navigate('/dear')}>받은 편지함</StButton>
        </StButtonWrapper>
      </StMotionFadeIn>
    </StPageWrapper>
  );
};

export default Home;

const StMotionFadeIn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StPageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
`;

const StTitle = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.TitleLogo};
`;

const StImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StImage = styled(motion.img)`
  width: 25rem;
`;

const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  min-width: 25rem;
`;

const StButton = styled.button`
  background-color: ${({ theme }) => theme.colors.Red2};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1.2rem 2rem;
  ${({ theme }) => theme.fonts.Title3};
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;
