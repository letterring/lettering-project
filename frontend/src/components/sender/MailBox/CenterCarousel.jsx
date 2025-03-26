import 'swiper/css';
import 'swiper/css/effect-coverflow';

import React, { useState } from 'react';
import styled from 'styled-components';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Closed1 from '../../../assets/images/mailbox/closed1.png';
import Closed4 from '../../../assets/images/mailbox/closed1.png';
import Closed2 from '../../../assets/images/mailbox/closed2.png';
import Closed3 from '../../../assets/images/mailbox/closed3.png';
import Closed5 from '../../../assets/images/mailbox/closed4.png';
import Opened1 from '../../../assets/images/mailbox/opened1.png';
import Opened4 from '../../../assets/images/mailbox/opened1.png';
import Opened2 from '../../../assets/images/mailbox/opened2.png';
import Opened3 from '../../../assets/images/mailbox/opened3.png';
import Opened5 from '../../../assets/images/mailbox/opened4.png';

const images = [
  { closed: Closed1, opened: Closed1 },
  { closed: Closed2, opened: Closed2 },
  { closed: Closed3, opened: Closed3 },
  { closed: Closed4, opened: Closed4 },
  { closed: Closed5, opened: Closed5 },
];

const SlideComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <StyledSwiper
      direction={'vertical'}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={5}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[EffectCoverflow]}
    >
      {images.map((img, idx) => {
        const distance = Math.abs(activeIndex - idx);
        const isVisible = distance <= 2;

        return (
          <StyledSlide key={idx} $hidden={!isVisible}>
            <img src={activeIndex === idx ? img.opened : img.closed} alt={`Slide ${idx + 1}`} />
          </StyledSlide>
        );
      })}
    </StyledSwiper>
  );
};

export default SlideComponent;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 45rem;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

const StyledSlide = styled(SwiperSlide)`
  display: flex;
  width: 90%;
  height: 12rem;
  visibility: ${(props) => (props.$hidden ? 'hidden' : 'show')};
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  transition:
    transform 0.6s ease-in-out,
    filter brightness(0.8);

  &.swiper-slide-active {
    transform: scale(1.2);
    transition:
      transform 0.6s ease-in-out,
      filter brightness(1);
    z-index: 10;
  }

  img {
    width: 100%;
    object-fit: contain;
  }
`;
