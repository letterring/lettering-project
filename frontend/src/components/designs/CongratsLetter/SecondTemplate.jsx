import React from 'react';
import styled from 'styled-components';

import BullonImg from '../../../assets/images/congratsletter/bullons.png';
import ConfettiImg from '../../../assets/images/congratsletter/confetti2.png';

const SecondTemplate = ({ images }) => {
  const mainImg = images?.imageLowUrl;

  return (
    <StWrapper>
      <StConffetti src={ConfettiImg} alt="컨페티" />
      <StLetterImage src={mainImg} alt="편지 사진" />
      <StTextImage src={BullonImg} alt="레터링" />
    </StWrapper>
  );
};

export default SecondTemplate;

const StWrapper = styled.div`
  width: 100%;
  height: 22rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  margin-bottom: 10rem;
`;

const StConffetti = styled.img`
  position: absolute;
  top: -3.7rem;
  right: center;
  width: 27rem;
  z-index: 1;
`;

const StTextImage = styled.img`
  position: absolute;
  top: 13rem;
  left: center;
  width: 27rem;
  z-index: 3;
`;

const StLetterImage = styled.img`
  position: absolute;
  top: 0rem;
  left: center;
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  z-index: 2;
`;
