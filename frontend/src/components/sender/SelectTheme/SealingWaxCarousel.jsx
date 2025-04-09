import React, { useRef } from 'react';
import styled from 'styled-components';

import SealingWaxItem from './SealingWaxItem';

const SealingWaxCarousel = ({ sealingWaxes, onSelect, selectedTheme }) => {
  const sliderRef = useRef(null);

  const handleSelect = (index) => {
    onSelect(sealingWaxes[index]);
  };

  return (
    <Wrapper>
      <CarouselContainer ref={sliderRef}>
        {sealingWaxes.map((theme, index) => (
          <SealingWaxItem
            key={`${theme.id}-${index}`}
            theme={theme}
            isSelected={theme.id === selectedTheme?.id}
            onClick={() => handleSelect(index)}
          />
        ))}
      </CarouselContainer>
    </Wrapper>
  );
};

export default SealingWaxCarousel;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0;
  margin-top: 6rem;
  margin-bottom: 1rem;

  padding: 0 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;
