import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getHighImage } from '@/apis/message'; // 경로는 상황에 맞게 수정

const ImageModals = ({ isOpen, onClose, messageId, images, currentIndex }) => {
  const [index, setIndex] = useState(currentIndex);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIndex(currentIndex);
    }
  }, [currentIndex, isOpen]);

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      const result = await getHighImage(messageId, images[index].index);
      if (result) setImageUrl(result.imageUrl);
      setLoading(false);
    };

    if (isOpen) fetchImage();
  }, [index, messageId, images, isOpen]);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <LoadingText>이미지를 불러오는 중...</LoadingText>
        ) : (
          <Image src={imageUrl} alt={`image-${index}`} />
        )}
        <NavButton direction="left" onClick={handlePrev}>
          ◀
        </NavButton>
        <NavButton direction="right" onClick={handleNext}>
          ▶
        </NavButton>
      </ModalWrapper>
    </Backdrop>
  );
};

export default ImageModals;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 0.5rem;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.2rem;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === 'left' ? 'left: 1rem;' : 'right: 1rem;')}
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  user-select: none;
`;
