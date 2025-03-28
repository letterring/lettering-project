import 'swiper/css';
import 'swiper/css/effect-coverflow';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getSenderMessages } from '../../../apis/mailbox';
import { IcDetail } from '../../../assets/icons';
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

const messages = [
  {
    dear: '하람',
    reply: true,
    type: 'letter',
    openTime: '1분 전',
    closed: Closed1,
    opened: Opened1,
  },
  {
    dear: '효승',
    reply: false,
    type: 'letter',
    openTime: '2시간 전',
    closed: Closed2,
    opened: Opened2,
  },
  {
    dear: '지수',
    reply: false,
    type: 'postcard',
    openTime: '1일 전',
    closed: Closed3,
    opened: Opened3,
  },
  {
    dear: '예슬',
    reply: false,
    type: 'letter',
    openTime: '25.03.18',
    closed: Closed4,
    opened: Opened4,
  },
  {
    dear: '승엽',
    reply: false,
    type: 'letter',
    openTime: '24.12.25',
    closed: Closed5,
    opened: Opened5,
  },
];

const SlideComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedIndices, setOpenedIndices] = useState([]);
  const [messages, setMessages] = useState([]);

  const getSenderMailbox = async () => {
    const { senderMessageSummaryList } = await getSenderMessages(0);
    setMessages(senderMessageSummaryList);
    console.log(senderMessageSummaryList);
  };

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

  useEffect(() => {
    getSenderMailbox();
  }, []);

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
      {messages.map((msg, idx) => {
        const { conditionTime, designType, id, replied, repliedName, sealingWaxId } = msg;
        const isVisible = Math.abs(activeIndex - idx) <= 2;
        const isCenter = activeIndex === idx;
        const isOpened = openedIndices.includes(idx);

        return (
          <StyledSlide key={id} $hidden={!isVisible} onClick={() => handleClick(idx)}>
            <SlideContent $align={getAlignType(idx, activeIndex)}>
              <ImageWrapper>
                <img src={isCenter && isOpened ? Opened1 : Closed1} alt={`Slide ${idx + 1}`} />
              </ImageWrapper>
              {isOpened && isCenter && (
                <Comment>
                  <p>
                    {repliedName}님께 보낸 {designType === 'letter' ? '편지' : '엽서'}
                  </p>
                  <p>답장 : {replied ? 1 : 0}</p>
                </Comment>
              )}
              <Details>
                <OpenTime>{conditionTime}</OpenTime>
                {isOpened && isCenter && (
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

  width: 90%;
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
  width: 27rem;
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
  }
`;

const Comment = styled.div`
  position: absolute;
  left: 7rem;
  top: 1rem;
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
  margin-top: 2rem;
  color: ${({ theme }) => theme.colors.Gray2};
  ${({ theme }) => theme.fonts.Body5};
`;

const DetailButton = styled.button`
  margin-top: 4rem;
`;
