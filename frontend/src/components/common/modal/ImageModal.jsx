import React, { useState } from 'react';
import styled from 'styled-components';

import { IcArrowLeft, IcArrowRight2 } from '../../../assets/icons/index.js';

const ImageModal = ({ isShowing, imageUrl, images, initialIndex = 0, onClose }) => {
  const hasSlider = Array.isArray(images) && images.length > 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const currentImage = hasSlider ? images[currentIndex] : imageUrl;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isShowing) return null;

  return (
    <StImageModalWrapper onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {hasSlider && <StyledArrowLeft onClick={handlePrev} />}
        <Image src={currentImage} alt="고화질 이미지" />
        {hasSlider && <StyledArrowRight onClick={handleNext} />}
      </ModalWrapper>
    </StImageModalWrapper>
  );
};

export default ImageModal;

const StImageModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 30rem;
  height: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StyledArrowLeft = styled(IcArrowLeft)`
  cursor: pointer;
  position: absolute;
  left: 0.2rem;
`;

const StyledArrowRight = styled(IcArrowRight2)`
  cursor: pointer;
  position: absolute;
  right: 0.2rem;
`;
