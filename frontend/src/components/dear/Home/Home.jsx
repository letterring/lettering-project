import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcMenu } from '../../../assets/icons';
import DearHomeImage from '../../../assets/icons/images/dear_home.png';
import useModal from '../../../hooks/common/useModal';
import LongButton from '../../common/button/LongButton';
import MenuModal from '../../common/modal/MenuModal';

const Home = () => {
  const navigate = useNavigate();
  const menu = useModal();

  const handleMenuClick = () => {
    menu.toggle();
  };

  const appearVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <>
      <StPageWrapper>
        <MenuBtn onClick={handleMenuClick} />
        <StMotionFadeIn
          variants={appearVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <StTitle>Lettering</StTitle>
        </StMotionFadeIn>

        <StImageWrapper>
          <StImage src={DearHomeImage} alt="우체통 이미지" />
        </StImageWrapper>

        <StMotionFadeIn
          variants={appearVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <StButtonWrapper>
            {/* <StButton onClick={() => navigate('/dear/postcard')}>새로운 편지 보러가기</StButton> */}
            <LongButton onClick={() => navigate('/dear')} btnName="받은 편지함" />
          </StButtonWrapper>
        </StMotionFadeIn>
      </StPageWrapper>
      <StMenuModalWrapper $showing={menu.isShowing} onClick={menu.toggle}>
        <MenuModal isShowing={menu.isShowing} status="시작 화면" target="dear" />
      </StMenuModalWrapper>
    </>
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

const MenuBtn = styled(IcMenu)`
  position: absolute;
  top: 4rem;
  right: 2rem;

  cursor: pointer;
`;

const StMenuModalWrapper = styled.div`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
