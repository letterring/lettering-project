import React from 'react';
import styled from 'styled-components';

const ImageModal = ({ isShowing, imageUrl, onClose }) => {
  return (
    isShowing && (
      <StImageModalWrapper onClick={onClose}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <Image src={imageUrl} alt="고화질 이미지" />
        </ModalWrapper>
      </StImageModalWrapper>
    )
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
