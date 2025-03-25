import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import KeyringCard from './KeyringCard';

const KeyringList = ({ keyringArr }) => {
  const settings = {
    dots: true, // 아래 점 네비게이션 표시
    infinite: false, // 무한 반복
    speed: 500, // 전환 속도
    slidesToShow: 1, // 한 번에 보이는 카드 수
    slidesToScroll: 1, // 한 번에 넘어가는 카드 수
    arrows: false, // 좌우 화살표 표시
    centerMode: true, // 중심 정렬
    centerPadding: '10%', // 좌우 여백
  };

  return (
    <StKeyringListWrapper>
      <Slider {...settings} tabIndex={-1}>
        {keyringArr.map((keyring) => (
          <KeyringCard keyring={keyring} key={keyring.id} />
        ))}
      </Slider>
    </StKeyringListWrapper>
  );
};

export default KeyringList;

const StKeyringListWrapper = styled.div`
  width: 100%;
  margin: 0 auto;

  .slick-list {
    overflow: hidden;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;
