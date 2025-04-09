import React, { useState } from 'react';
import styled from 'styled-components';

const ImageModal = ({ isShowing, imageUrls = [], onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isShowing || !imageUrls.length) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < imageUrls.length - 1 ? prev + 1 : prev));
  };

  return (
    <StImageModalWrapper onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {currentIndex > 0 && <ArrowLeft onClick={handlePrev}>&lt;</ArrowLeft>}
        <Image src={imageUrls[currentIndex]} alt={`image-${currentIndex}`} />
        {currentIndex < imageUrls.length - 1 && <ArrowRight onClick={handleNext}>&gt;</ArrowRight>}
      </ModalWrapper>
    </StImageModalWrapper>
  );
};

export default ImageModal;

const StImageModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  position: relative;
  width: 30rem;
  max-width: 90vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
  padding: 0 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

const ArrowLeft = styled(ArrowButton)`
  left: -2rem;
`;

const ArrowRight = styled(ArrowButton)`
  right: -2rem;
`;
