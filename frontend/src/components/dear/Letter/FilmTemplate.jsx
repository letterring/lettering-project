import React, { useRef } from 'react';
import styled from 'styled-components';

import FilmImg from '../../../assets/images/letter/film.png';

const FilmTemplate = ({ images }) => {
  const scrollRef = useRef();
  const imageHeight = 135;
  const imageWidth = 136;
  const imageGap = 6;
  const filmWidth = 715;
  const filmHeight = 180;

  const handleTouch = (e) => {
    e.stopPropagation();
  };

  return (
    <StWrapper>
      <StMaskWrapper>
        <StRotateWrapper>
          <StSliderContainer
            ref={scrollRef}
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            onTouchEnd={handleTouch}
          >
            <StImageSlider>
              {images.map((src, idx) => (
                <StPhoto
                  $width={`${imageWidth}px`}
                  $height={`${imageHeight}px`}
                  $gap={`${imageGap}px`}
                  key={idx}
                  src={src}
                  alt={`film-${idx}`}
                />
              ))}
            </StImageSlider>
            <StFilmOverlay
              $width={`${filmWidth}px`}
              $height={`${filmHeight}px`}
              src={FilmImg}
              alt="필름 배경"
            />
          </StSliderContainer>
        </StRotateWrapper>
      </StMaskWrapper>
    </StWrapper>
  );
};

export default FilmTemplate;

const StWrapper = styled.div`
  width: 100%;
  height: 22rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const StMaskWrapper = styled.div`
  position: absolute;
  width: 27.5rem;
  height: 250px;
  left: -2rem;
  overflow: hidden;
`;

const StRotateWrapper = styled.div`
  position: relative;
  width: 31rem;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StSliderContainer = styled.div`
  display: flex;
  position: relative;
  height: 182px;
  width: max-content;
  left: -2rem;
  transform: rotate(-7deg);
  transform-origin: center;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StImageSlider = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;
`;

const StPhoto = styled.img`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  object-fit: cover;
  scroll-snap-align: center;
  margin-left: ${(props) => props.$gap};
`;

const StFilmOverlay = styled.img`
  position: absolute;
  top: 4px;
  height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  z-index: 3;
  pointer-events: none;
  opacity: 0.9;
`;
