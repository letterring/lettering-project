import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import PolarImg1 from '../../../assets/images/letter/polar1.png';
import PolarImg2 from '../../../assets/images/letter/polar2.png';

const PolarTemplate = ({ images, isActive }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isActive && !loaded) {
      setLoaded(true);
    }
  }, [isActive, loaded]);

  return (
    <StWrapper>
      <StPolarBack src={PolarImg1} alt="폴라로이드 배경" />
      <StImageBack src={images[1]} alt="사진" $loaded={loaded} />
      <StPolarFront src={PolarImg2} alt="폴라로이드 배경" />
      <StImageFront src={images[0]} alt="사진" $loaded={loaded} />
    </StWrapper>
  );
};

export default PolarTemplate;

const StWrapper = styled.div`
  width: 100%;
  height: 22rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const StPolarBack = styled.img`
  position: absolute;
  top: 5rem;
  right: 0.5rem;
  width: 150px;
  object-fit: contain;
  transform: rotate(-3deg);
  z-index: 1;
`;

const StImageBack = styled.img`
  position: absolute;
  top: 66px;
  right: 20px;
  width: 123px;
  height: 140px;
  object-fit: cover;
  transform: rotate(-2.5deg);
  z-index: 2;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 5s ease;
`;

const StPolarFront = styled.img`
  position: absolute;
  top: -1rem;
  left: 0.5rem;
  width: 150px;
  object-fit: contain;
  transform: rotate(12deg);
  z-index: 3;
`;

const StImageFront = styled.img`
  position: absolute;
  top: 1px;
  left: 22px;
  width: 123px;
  height: 140px;
  object-fit: cover;
  transform: rotate(11.5deg);
  z-index: 4;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 5s ease;
`;
