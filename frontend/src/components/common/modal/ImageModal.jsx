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
        {hasSlider && <ArrowButtonLeft onClick={handlePrev}>◀</ArrowButtonLeft>}
        <Image src={currentImage} alt="고화질 이미지" />
        {hasSlider && <ArrowButtonRight onClick={handleNext}>▶</ArrowButtonRight>}
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
  background: rgba(0, 0, 0, 0.6);
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

const ArrowButtonLeft = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 2rem;
  color: white;
  z-index: 10000;
`;

const ArrowButtonRight = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 2rem;
  color: white;
  z-index: 10000;
`;
