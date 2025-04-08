import 'swiper/css';
import 'swiper/css/effect-coverflow';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getDearMessages, setFavorites } from '../../../apis/mailbox';
import { IcDetail, IcLikesFalse, IcLikesTrue, IcLock2 } from '../../../assets/icons';
import Closed2 from '../../../assets/images/mailbox/closed2.png';
import Closed1 from '../../../assets/images/mailbox/closed3.png';
import Closed3 from '../../../assets/images/mailbox/closed3.png';
import Opened2 from '../../../assets/images/mailbox/opened2.png';
import Opened1 from '../../../assets/images/mailbox/opened3.png';
import Opened3 from '../../../assets/images/mailbox/opened3.png';
import { getRelativeFormat } from '../../../util/getRelativeDate';
import RealTimer from './RealTimer';

const closedImages = {
  1: Closed3,
  2: Closed2,
  3: Closed1,
};

const openedImages = {
  1: Opened3,
  2: Opened2,
  3: Opened1,
};

const SlideComponent = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedIndices, setOpenedIndices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const getDearMailbox = async (currentPage) => {
    setLoading(true);
    const response = await getDearMessages(currentPage, 19);
    const { dearMessagesSummaryList } = response || {};

    if (dearMessagesSummaryList) {
      if (dearMessagesSummaryList.length === 0) {
        setHasMore(false);
      } else {
        setMessages((prev) => [...prev, ...dearMessagesSummaryList]);
      }

      setLoading(false);

      if (currentPage === 0) {
        setInitialLoaded(true);
      }
    }
  };

  const isPastDate = (conditionTime) => {
    const openDate = new Date(conditionTime);
    const now = new Date();
    return openDate <= now;
  };

  const handleClick = (idx) => {
    const message = messages[idx];
    if (!isPastDate(message.conditionTime)) return;

    if (activeIndex !== idx) return;

    setOpenedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;

    if (newIndex > activeIndex && !loading && hasMore && newIndex === page * 7 + 2) {
      const nextPage = page + 1;
      setPage(nextPage);
      getDearMailbox(nextPage);
    }

    setActiveIndex(newIndex);
  };

  const handleOpenMsg = (type, messageId) => {
    if (type === 'POSTCARD') {
      navigate(`/dear/postcard/detail/${messageId}`);
    } else {
      navigate(`/dear/letter/detail/${messageId}`);
    }
  };

  const getAlignType = (idx, activeIdx) => {
    const diff = idx - activeIdx;
    if (diff === 0) return 'center';
    if (diff < 0) return 'flex-start';
    return 'flex-end';
  };

  const handleToggleFavorite = async (event, idx, id) => {
    event.stopPropagation();

    setMessages((prevMessages) =>
      prevMessages.map((msg, messageIndex) =>
        idx === messageIndex ? { ...msg, favorite: !msg.favorite } : msg,
      ),
    );

    await setFavorites(id);
  };

  useEffect(() => {
    if (!initialLoaded) {
      getDearMailbox(0);
    }
  }, [initialLoaded]);

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
        const { id, conditionTime, replied, sealingWaxId, favorite, designType, opened } = msg;
        const isVisible = Math.abs(activeIndex - idx) <= 2;
        const isCenter = activeIndex === idx;
        const isOpened = openedIndices.includes(idx);
        const isPast = isPastDate(conditionTime);

        let commentText = '';
        if (isPast && !opened) {
          commentText = '아직 읽지 않은 편지입니다.';
        } else if (opened && !replied) {
          commentText = '아직 답장을 하지 않았어요.';
        } else if (opened && replied) {
          commentText = '답장을 완료했어요!';
        }

        return (
          <StyledSlide key={idx} $hidden={!isVisible}>
            <SlideContent $align={getAlignType(idx, activeIndex)}>
              <ImageWrapper>
                <img
                  onClick={() => {
                    handleClick(idx);
                  }}
                  // className={!isPast && isCenter ? 'blurred' : ''}
                  src={
                    isCenter && isOpened && isPast
                      ? openedImages[sealingWaxId]
                      : closedImages[sealingWaxId]
                  }
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
                  <OpenTime>{getRelativeFormat(conditionTime)}</OpenTime>
                  {isPast ? (
                    favorite ? (
                      <button onClick={(event) => handleToggleFavorite(event, idx, id)}>
                        <IcLikesTrue />
                      </button>
                    ) : (
                      <button onClick={(event) => handleToggleFavorite(event, idx, id)}>
                        <IcLikesFalse />
                      </button>
                    )
                  ) : (
                    <IcLock2 />
                  )}
                </StyledIcon>
                {isPast && isOpened && isCenter && (
                  <DetailButton>
                    <IcDetail onClick={() => handleOpenMsg(designType, id)} />
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
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  border-radius: 1rem;

  background-color: rgba(0, 0, 0, 0.3);
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
  margin-right: 1rem;

  color: ${({ theme }) => theme.colors.Gray2};
  ${({ theme }) => theme.fonts.Body5};

  text-align: end;
`;

const StyledIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 9rem;
  margin-top: 2rem;

  svg {
    width: 2rem;
  }

  button {
    z-index: 10;
  }
`;

const DetailButton = styled.button`
  margin-top: 4rem;
`;
