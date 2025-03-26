import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import SealingWaxItem from './SealingWaxItem';

const SealingWaxCarousel = ({ onSelect, selectedTheme }) => {
  const [themes, setThemes] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const mockData = [
      { id: 1, sealing_wax_name: 'Happy Birthday', image_url: '/temp-images/1.png' },
      { id: 2, sealing_wax_name: 'Love Letter', image_url: '/temp-images/2.png' },
      { id: 3, sealing_wax_name: 'Special Day', image_url: '/temp-images/3.png' },
      { id: 4, sealing_wax_name: 'Thank You', image_url: '/temp-images/4.png' },
      { id: 5, sealing_wax_name: 'Congratulations', image_url: '/temp-images/5.png' },
    ];

    setThemes(mockData);
  }, []);

  const handleSelect = (index) => {
    onSelect(themes[index]);
  };

  return (
    <Wrapper>
      <CarouselContainer ref={sliderRef}>
        {themes.map((theme, index) => (
          <SealingWaxItem
            key={`${theme.id}-${index}`}
            theme={theme}
            isSelected={theme.sealing_wax_name === selectedTheme?.sealing_wax_name}
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

  &::-webkit-scrollbar {
    display: none;
  }
`;
