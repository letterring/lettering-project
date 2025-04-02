import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import FilmImg from '../../../assets/images/letter/film.png';

const FilmTemplate = ({ images }) => {
  const [animate, setAnimate] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleTouchOutside = (e) => {
      if (sliderRef.current && !sliderRef.current.contains(e.target)) {
        setAnimate(true);
      }
    };

    document.addEventListener('touchstart', handleTouchOutside);
    return () => {
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, []);

  return (
    <StWrapper>
      <StMaskWrapper>
        <StRotateWrapper>
          <StSliderContainer
            ref={sliderRef}
            onMouseEnter={() => setAnimate(false)}
            onTouchStart={() => setAnimate(false)}
          >
            <StImageSlider>
              <StSlide $animate={animate}>
                {images.map((src, idx) => (
                  <StPhoto key={`orig-${idx}`} src={src.imageLowUrl} alt={`film-${idx}`} />
                ))}
              </StSlide>
              <StSlide $animate={animate} $clone>
                {images.map((src, idx) => (
                  <StPhoto key={`orig-${idx}`} src={src.imageLowUrl} alt={`film-${idx}`} />
                ))}
              </StSlide>
            </StImageSlider>
            <StFilmOverlay src={FilmImg} alt="필름 배경" $animate={animate} />
            <StFilmOverlay src={FilmImg} alt="필름 배경" $animate={animate} $clone />
          </StSliderContainer>
        </StRotateWrapper>
      </StMaskWrapper>
    </StWrapper>
  );
};

export default FilmTemplate;

const slideAnimation1 = keyframes`
  0% { transform: translateX(0%); }
  50% { transform: translateX(-100%); }
  50.1% { transform: translateX(100%); }
  100% { transform: translateX(0%); }
`;

const slideAnimation2 = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-200%); }
`;

const StWrapper = styled.div`
  width: 100%;
  height: 22rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
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
  width: 28rem;
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
  left: 2rem;
  transform: rotate(-7deg);
  transform-origin: center;
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StImageSlider = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const StSlide = styled.div`
  display: flex;
  padding-top: 25px;
  flex-wrap: nowrap;

  ${({ $animate, $clone }) =>
    $animate &&
    css`
      animation: ${$clone ? slideAnimation2 : slideAnimation1} 50s linear infinite;
    `}

  ${({ $animate }) =>
    !$animate &&
    css`
      animation-play-state: paused;
    `}
`;

const StPhoto = styled.img`
  width: 136.5px;
  height: 135px;
  object-fit: cover;
  margin: 0 3.2px;
`;

const StFilmOverlay = styled.img`
  position: absolute;
  top: 4px;
  height: 180px;
  width: 715px;
  z-index: 3;
  pointer-events: none;

  ${({ $clone }) =>
    $clone &&
    css`
      left: 715px;
    `}

  ${({ $animate, $clone }) =>
    $animate &&
    css`
      animation: ${$clone ? slideAnimation2 : slideAnimation1} 50s linear infinite;
    `}

  ${({ $animate }) =>
    $animate === false &&
    css`
      animation-play-state: paused;
    `}
`;
