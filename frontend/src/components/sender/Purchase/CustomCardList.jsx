import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import CustomCard from './CustomCard';

const CustomCardList = ({ cardList, onChange }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <StCardListWrapper>
      <Slider {...settings} tabIndex={-1} lazyLoad="ondemand">
        {cardList.map((info, i) => (
          <div key={i}>
            <CustomCard
              index={i}
              nickname={info.nfcName}
              message={info.customMessage}
              onChange={onChange}
            />
          </div>
        ))}
      </Slider>
    </StCardListWrapper>
  );
};

export default CustomCardList;

const StCardListWrapper = styled.div`
  height: 30rem;
  width: 100%;

  .slick-list {
    overflow: hidden;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    display: flex !important;
    justify-content: center;
  }

  .slick-dots {
    bottom: -1.5rem;
  }
`;
