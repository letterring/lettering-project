import 'swiper/css';
import 'swiper/css/effect-coverflow';

import React, { useState } from 'react';
import styled from 'styled-components';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IcDetail, IcLikesFalse, IcLikseTrue, IcLock } from '../../../assets/icons';
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
import { getRelativeDate } from '../../../util/getTimer';
import RealTimer from './RealTimer';

const dearMessagesSummaryList = [
  {
    id: 1,
    conditionTime: '2025-03-27T20:55:16.706828',
    replied: false,
    sealingWaxId: 1,
    favorite: false,
    designType: 'POSTCARD',
    opened: false,
  },
  {
    id: 2,
    conditionTime: '2025-03-26T19:55:12.537608',
    replied: false,
    sealingWaxId: 1,
    favorite: false,
    designType: 'POSTCARD',
    opened: false,
  },
  {
    id: 3,
    conditionTime: '2025-03-25T12:55:12.537608',
    replied: false,
    sealingWaxId: 1,
    favorite: true,
    designType: 'POSTCARD',
    opened: true,
  },
  {
    id: 4,
    conditionTime: '2025-03-24T16:55:09.787599',
    replied: true,
    sealingWaxId: 1,
    favorite: false,
    designType: 'POSTCARD',
    opened: true,
  },
  {
    id: 5,
    conditionTime: '2025-03-20T16:55:06.715816',
    replied: false,
    sealingWaxId: 1,
    favorite: false,
    designType: 'POSTCARD',
    opened: false,
  },
];

const closedImages = {
  1: Closed1,
  2: Closed2,
  3: Closed3,
  4: Closed4,
  5: Closed5,
};

const openedImages = {
  1: Opened1,
  2: Opened2,
  3: Opened3,
  4: Opened4,
  5: Opened5,
};

const SlideComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedIndices, setOpenedIndices] = useState([]);

  const handleClick = (idx) => {
    if (activeIndex !== idx) return;

    setOpenedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const getAlignType = (idx, activeIdx) => {
    const diff = idx - activeIdx;
    if (diff === 0) return 'center';
    if (diff < 0) return 'flex-start';
    return 'flex-end';
  };

  return (
    <StyledSwiper
      direction="vertical"
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView={5}
      onSlideChange={handleSlideChange}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      modules={[EffectCoverflow]}
    >
      {dearMessagesSummaryList.map((msg, idx) => {
        const isVisible = Math.abs(activeIndex - idx) <= 2;
        const isCenter = activeIndex === idx;
        const isOpened = openedIndices.includes(idx);

        const openDate = new Date(msg.conditionTime);
        const now = new Date();
        const isPast = openDate <= now;

        let commentText = '';
        if (!isPast) {
          commentText = '편지가 열리기 까지..';
        } else if (isPast && !msg.opened) {
          commentText = '아직 읽지 않은 편지입니다.';
        } else if (msg.opened && !msg.replied) {
          commentText = '아직 답장을 하지 않았어요.';
        } else if (msg.opened && msg.replied) {
          commentText = '답장을 완료했어요!';
        }

        return (
          <StyledSlide key={idx} $hidden={!isVisible} onClick={() => handleClick(idx)}>
            <SlideContent $align={getAlignType(idx, activeIndex)}>
              <ImageWrapper>
                <img
                  // className={!isPast && isCenter ? 'blurred' : ''}
                  src={isCenter && isOpened && isPast ? openedImages[msg.id] : closedImages[msg.id]}
                  alt={`Slide ${idx + 1}`}
                />
                {!isPast && isCenter && (
                  <Overlay>
                    <RealTimer msg={msg} isCenter={isCenter} isOpened={isOpened} />
                  </Overlay>
                )}
              </ImageWrapper>

              {isCenter && isOpened && (
                <Comment>
                  <p>{commentText}</p>
                </Comment>
              )}
              <Details>
                <StyledIcon>
                  <OpenTime>{getRelativeDate(msg.conditionTime)}</OpenTime>
                  {isPast ? msg.favorite ? <IcLikseTrue /> : <IcLikesFalse /> : <IcLock />}
                </StyledIcon>
                {isPast && isOpened && isCenter && (
                  <DetailButton>
                    <IcDetail />
                  </DetailButton>
                )}
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
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 45rem;
  /* overflow: hidden; */
`;

const StyledSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  position: relative;

  visibility: ${({ $hidden }) => ($hidden ? 'hidden' : 'visible')};
  transition:
    transform 0.6s ease-in-out,
    filter 0.6s ease-in-out;
  cursor: pointer;

  &.swiper-slide-active {
    transform: scale(1.2);
    z-index: 10;
  }
`;

const SlideContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: ${({ $align }) => $align};

  position: relative;
  width: 30rem;
  height: 100%;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 60%;
  left: 1rem;
  width: 20rem;
  transform: translateY(-50%);

  img {
    width: 100%;
    object-fit: contain;
    display: block;
    transition: filter 0.3s ease;
  }

  /* .blurred {
    filter: blur(4px);
  } */
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  color: white;
  ${({ theme }) => theme.fonts.Body2};
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 13rem;
  height: 3rem;
  position: absolute;
  left: 5rem;
  top: 2rem;
  ${({ theme }) => theme.fonts.EduBody1};
  color: ${({ theme }) => theme.colors.Gray1};
  text-align: center;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const OpenTime = styled.div`
  text-align: end;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.Gray2};
  ${({ theme }) => theme.fonts.Body5};
`;

const StyledIcon = styled.div`
  width: 9rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  svg {
    width: 2rem;
  }
`;

const DetailButton = styled.button`
  margin-top: 4rem;
`;
