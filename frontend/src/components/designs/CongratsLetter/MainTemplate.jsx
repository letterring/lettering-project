import React from 'react';
import styled from 'styled-components';

import confettiImg from '../../../assets/images/congratsLetter/confetti.png';
import RibbonImg from '../../../assets/images/congratsLetter/ribbon.png';

const MainTemplate = ({ images }) => {
  const mainImg = images?.imageLowUrl;

  return (
    <StWrapper>
      <StConfetti src={confettiImg} alt="컨페티" />
      <StLetterImage src={mainImg} alt="편지 사진" />
      <StRibbon src={RibbonImg} alt="레터링" />
    </StWrapper>
  );
};

export default MainTemplate;

const StWrapper = styled.div`
  width: 100%;
  height: 22rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;
`;

const StConfetti = styled.img`
  position: absolute;
  top: -6rem;
  right: center;
  width: 27rem;
  z-index: 1;
`;

const StRibbon = styled.img`
  position: absolute;
  top: 15rem;
  left: -3.3rem;
  width: 29.2rem;
  z-index: 4;
`;

const StLetterImage = styled.img`
  position: absolute;
  top: 3rem;
  left: 3rem;
  width: 17.2rem;
  height: 17.2rem;
  object-fit: cover;
  z-index: 3;
`;
