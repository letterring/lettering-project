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
  {
    dear: '하람',
    reply: true,
    type: 'letter',
    openTime: '1분전',
    closed: Closed1,
    opened: Opened1,
  },
  {
    dear: '효승',
    reply: false,
    type: 'letter',
    openTime: '2시간전',
    closed: Closed2,
    opened: Opened2,
  },
  {
    dear: '지수',
    reply: false,
    type: 'postcard',
    openTime: '1일전',
    closed: Closed3,
    opened: Opened3,
  },
  {
    dear: '예슬',
    reply: false,
    type: 'letter',
    openTime: '2025.03.18',
    closed: Closed4,
    opened: Opened4,
  },
  {
    dear: '승엽',
    reply: false,
    type: 'letter',
    openTime: '2024.12.25',
    closed: Closed5,
    opened: Opened5,
  },
];

const SlideComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedIndices, setOpenedIndices] = useState([]);

  const handleClick = (idx) => {
    if (activeIndex === idx && !openedIndices.includes(idx)) {
      setOpenedIndices([...openedIndices, idx]);
    }
  };

  return (
    <StyledSwiper
      direction="vertical"
      effect="coverflow"
      grabCursor
      centeredSlides
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
        const isVisible = Math.abs(activeIndex - idx) <= 2;
        const isOpened = openedIndices.includes(idx) && activeIndex === idx;
        const isCenter = activeIndex === idx;

        return (
          <StyledSlide key={idx} $hidden={!isVisible} onClick={() => handleClick(idx)}>
            <SlideContent>
              <img src={isOpened ? img.opened : img.closed} alt={`Slide ${idx + 1}`} />
              {isOpened && isCenter && (
                <Comment>
                  <p>
                    {img.dear}님께 보낸 {img.type === 'letter' ? '편지' : '엽서'}
                  </p>
                  <p>답장 : {img.reply ? 1 : 0}</p>
                </Comment>
              )}
              <Details>
                <OpenTime>{img.openTime}</OpenTime>
                {isOpened && isCenter && <DetailButton>상세보기</DetailButton>}
              </Details>
            </SlideContent>
          </StyledSlide>
        );
      })}
    </StyledSwiper>
  );
};

export default SlideComponent;

const StyledSwiper = styled(Swiper)`
  width: 90%;
  height: 45rem;
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSlide = styled(SwiperSlide)`
  width: 100%;
  /* height: 12rem; */
  display: flex;
  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition:
    transform 0.6s ease-in-out,
    filter 0.6s ease-in-out;

  &.swiper-slide-active {
    transform: scale(1.2);
    z-index: 10;
  }
`;

const SlideContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 80%;
    object-fit: contain;
  }
`;

const Comment = styled.div`
  position: absolute;
  left: center;
  top: center;
  ${({ theme }) => theme.fonts.EduBody2};
  color: ${({ theme }) => theme.colors.Gray0};
  text-align: center;
`;

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const OpenTime = styled.div`
  /* position: absolute;
  top: 10px;
  right: 12px; */
  color: ${({ theme }) => theme.colors.Gray0};
  padding: 4px 8px;
  font-size: 0.8rem;
  border-radius: 8px;
`;

const DetailButton = styled.button`
  /* position: absolute;
  top: 50%;
  right: 0; */
  transform: translateY(-50%);
  padding: 6px 10px;
  font-size: 0.8rem;
  border-radius: 8px;
  background-color: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;
