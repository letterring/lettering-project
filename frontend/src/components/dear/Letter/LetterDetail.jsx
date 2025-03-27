import React from 'react';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import DummyImg from '/src/assets/dummy/letter.jpg';
import LetterImg1 from '/src/assets/images/letter/letter1.png';
import LetterImg2 from '/src/assets/images/letter/letter2.png';
import LetterImg3 from '/src/assets/images/letter/letter3.png';
import LetterImg4 from '/src/assets/images/letter/letter4.png';

import Header from '../../common/Header';
import LetterContent from './LetterContent';

const LetterDetail = () => {
  const contents = [
    {
      template: 'main',
      images: [DummyImg],
      text: '사랑하는 너에게, 오늘 아침 눈을 뜨자마자 달력을 보니 우리 기념일이라는 사실에 마음이 설렌다. 우리가 함께 보낸 시간이 벌써 이렇게 쌓였다는 게 믿기지 않을 정도로 빠르게 느껴져. 처음 만났던 순간부터 지금까지 함께한 모든 기억들이 하나둘 떠오르면서 마음이 참 따뜻해졌어.',
      background: LetterImg1,
    },
    {
      template: 'film',
      images: [DummyImg, DummyImg, DummyImg, DummyImg, DummyImg],
      text: '특히 처음으로 둘이 떠났던 그 여행 기억나? 분명히 잘 계획한 줄 알았는데 지도 앱 때문에 엉뚱한 길로 빠져서 두 시간이나 헤맸잖아. 그때는 조금 당황스럽기도 했지만, 오히려 그 덕분에 우리는 더 많은 얘기를 나눌 수 있었던 것 같아. 너와 함께라서 그런 작은 실수조차도 웃음으로 바뀌는 마법 같은 일이 벌어졌지.',
      background: LetterImg2,
    },
    {
      template: 'polar',
      images: [DummyImg, DummyImg],
      text: '생각해보면 너와의 일상은 특별한 일들로만 채워지지 않아도 충분히 즐거워. 함께 본 영화가 지루해서 서로 장난치며 보냈던 시간도, 가끔 요리를 실패해 배달 음식을 주문하며 웃었던 날들도 모두 우리에겐 특별한 순간들이었어. 네가 곁에 있기에 평범한 일상조차도 소중한 추억이 된다는 걸 알게 되었어.',
      background: LetterImg3,
    },
    {
      template: 'card',
      images: [DummyImg, DummyImg],
      text: '앞으로도 서로를 향한 이해와 배려 속에서 지금처럼 편안하게, 때로는 친구처럼, 때로는 연인처럼 함께 지낼 수 있기를 바라. 실수하고 어색한 순간들도 있을 테지만, 그 모든 걸 함께 웃으며 넘길 수 있는 사이로 계속해서 함께하고 싶어. 언제나 내 곁에 있어줘서 정말 고맙고, 무엇보다 내가 너를 이렇게 많이 좋아하게 해줘서 정말 고마워. 우리의 기념일을 진심으로 축하해. 앞으로도 계속 너를 아끼고 사랑할 나로부터.',
      background: LetterImg4,
    },
    {
      template: 'answer',
      images: [DummyImg],
      background: null,
    },
  ];
  // const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    swipe: true,
    fade: true,
    // afterChange: (current) => {
    //   setCurrentSlide(current);
    //   setButtonText(current === pageInfo.length - 1 ? '시작하기' : '옆으로 넘겨주세요');
    // },
  };

  return (
    <StPageWrapper>
      <Header headerName="Lettering" />

      <StyledSlider ref={sliderRef} {...settings}>
        {contents.map((item, id) => (
          <LetterContent
            key={id}
            template={item.template}
            images={item.images}
            text={item.text}
            background={item.background}
          />
        ))}
      </StyledSlider>
    </StPageWrapper>
  );
};

export default LetterDetail;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  width: 100%;

  .slick-list {
    overflow: hidden;
    height: 100%;
  }

  .slick-track {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
