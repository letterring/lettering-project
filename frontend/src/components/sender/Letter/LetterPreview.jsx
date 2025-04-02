import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import { getUserFont } from '/src/apis/user';
import DummyImg1 from '/src/assets/dummy/letter.jpg';
import DummyImg7 from '/src/assets/dummy/photo_blossom1.png';
import DummyImg8 from '/src/assets/dummy/photo_blossom2.png';
import DummyImg2 from '/src/assets/dummy/photo_slide1.png';
import DummyImg3 from '/src/assets/dummy/photo_slide2.png';
import DummyImg4 from '/src/assets/dummy/photo_slide3.png';
import DummyImg5 from '/src/assets/dummy/photo_slide4.png';
import DummyImg6 from '/src/assets/dummy/photo_slide5.png';
import DummyImg9 from '/src/assets/dummy/photo_twogrid1.png';
import DummyImg10 from '/src/assets/dummy/photo_twogrid2.png';
import LetterImg1 from '/src/assets/images/letter/letter1.png';
import LetterImg2 from '/src/assets/images/letter/letter2.png';
import LetterImg3 from '/src/assets/images/letter/letter3.png';
import LetterImg4 from '/src/assets/images/letter/letter4.png';
import { getFontStyle } from '/src/util/getFont';

import { IcArrowLeft, IcArrowRight2 } from '../../../assets/icons';
import Header from '../../common/Header';
import AiButton from './AiButton';
import AiEnhanceModal from './AiEnhanceModal';
import AiRefineModal from './AiRefineModal';
import LetterEditor from './LetterEditor';

const LetterPreview = () => {
  const imageDummy = [
    DummyImg1,
    DummyImg2,
    DummyImg3,
    DummyImg4,
    DummyImg5,
    DummyImg6,
    DummyImg7,
    DummyImg8,
    DummyImg9,
    DummyImg10,
    DummyImg1,
  ];

  const textDummy = [
    '오늘 아침 눈을 뜨자마자 달력을 보니 우리 기념일이라는 사실에 마음이 설렌다. 우리가 함께 보낸 시간이 벌써 이렇게 쌓였다는 게 믿기지 않을 정도로 빠르게 느껴져. ',
    '특히 처음으로 둘이 떠났던 그 여행 기억나? 분명히 잘 계획한 줄 알았는데 지도 앱 때문에 엉뚱한 길로 빠져서 두 시간이나 헤맸잖아. 그때는 조금 당황스럽기도 했지만, 오히려 그 덕분에 우리는 더 많은 얘기를 나눌 수 있었던 것 같아.',
    '생각해보면 너와의 일상은 특별한 일들로만 채워지지 않아도 충분히 즐거워. 함께 본 영화가 지루해서 서로 장난치며 보냈던 시간도, 가끔 요리를 실패해 배달 음식을 주문하며 웃었던 날들도 모두 우리에겐 특별한 순간들이었어. ',
    '앞으로도 서로를 향한 이해와 배려 속에서 지금처럼 편안하게, 때로는 친구처럼, 때로는 연인처럼 함께 지낼 수 있기를 바라. 실수하고 어색한 순간들도 있을 테지만, 그 모든 걸 함께 웃으며 넘길 수 있는 사이로 계속해서 함께하고 싶어.',
    '언제나 내 곁에 있어줘서 정말 고맙고, 무엇보다 내가 너를 이렇게 많이 좋아하게 해줘서 정말 고마워. 앞으로도 계속 너를 아끼고 사랑할 나로부터.',
  ];

  const aiDummy = {
    refine: ['안녕 AI가 생성한 문장으로 변경됫어', '안녕 AI가 생성한 문장으로 변경됫어222'],
    enhance: [
      {
        title: '사진이 담고 있는 순간을 표현하기',
        text: '이 사진 속 우리, 해질 무렵 바다를 배경으로 웃고 있었지. 그때 네 얼굴을 보고 얼마나 행복했는지 몰라!',
      },
      {
        title: '사진에 얽힌 에피소드나 비하인드 이야기',
        text: '사진 찍으려고 포즈 잡는데 갑자기 바람 불어서 네 머리 휘날리던 거 아직도 생각나 ㅋㅋ 그 모습까지 너무 예뻤어.',
      },
      {
        title: '같은 장소에서의 미래를 상상해보기',
        text: '나중에 저 장소에 다시 가게 되면, 이번엔 손 꼭 잡고 더 많은 걸 나누고 싶어.',
      },
    ],
  };

  const [textList, setTextList] = useState([...textDummy]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [userFont, setUserFont] = useState(undefined);

  useEffect(() => {
    const fetchFont = async () => {
      const { font } = await getUserFont();
      setUserFont(getFontStyle(font));
    };

    fetchFont();
  }, []);

  const handleTextChange = (index, value) => {
    const updated = [...textList];
    updated[index] = value;
    setTextList(updated);
  };

  const handleUseRefineText = (suggestionList) => {
    const updated = [...textList];
    const { textStartIndex, textCount } = contents[currentSlide];

    const slicedSuggestions = suggestionList.slice(0, textCount);

    for (let i = 0; i < textCount; i++) {
      updated[textStartIndex + i] = slicedSuggestions[i] || '';
    }

    setTextList(updated);
    setActiveModal(null);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const contentConfig = [
    { template: 'main', imageCount: 1, textCount: 1, background: LetterImg1 },
    { template: 'film', imageCount: 5, textCount: 1, background: LetterImg2 },
    { template: 'polar', imageCount: 2, textCount: 1, background: LetterImg3 },
    { template: 'card', imageCount: 2, textCount: 2, background: LetterImg4 },
    { template: 'end', imageCount: 1, textCount: 0, background: null },
  ];

  let imageIndex = 0;
  let textIndex = 0;

  const contents = contentConfig.map(({ template, imageCount, textCount, background }) => {
    const images = imageDummy.slice(imageIndex, imageIndex + imageCount);
    const textStartIndex = textIndex;

    imageIndex += imageCount;
    textIndex += textCount;

    return {
      template,
      images: imageCount === 1 ? images[0] : images,
      textStartIndex,
      textCount,
      background,
    };
  });

  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    swipe: true,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <StLetterPreview>
      <Header headerName="편지쓰기" />
      <ContentWrapper>
        <StyledSlider ref={sliderRef} {...settings}>
          {contents.map((item, id) => (
            <LetterEditor
              key={id}
              template={item.template}
              images={item.images}
              background={item.background}
              textStartIndex={item.textStartIndex}
              textCount={item.textCount}
              textList={textList}
              onTextChange={handleTextChange}
              font={userFont}
            />
          ))}
        </StyledSlider>
      </ContentWrapper>

      {currentSlide !== contents.length - 1 && (
        <AiButton
          onOpenModal={(type) => {
            setActiveModal(type);
          }}
        />
      )}

      {/* 모달 */}
      {activeModal === 'add' && (
        <AiEnhanceModal onClose={closeModal} font={userFont} tips={aiDummy.enhance} />
      )}
      {activeModal === 'edit' && (
        <AiRefineModal
          onClose={closeModal}
          font={userFont}
          suggestions={aiDummy.refine}
          onUse={handleUseRefineText}
        />
      )}
    </StLetterPreview>
  );
};

export default LetterPreview;

const StLetterPreview = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.White};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 8rem 3rem;
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

const NextArrow = ({ onClick, currentSlide, slideCount }) => {
  if (currentSlide === slideCount - 1) return null;
  return (
    <ArrowRight onClick={onClick}>
      <IcArrowRight2 />
    </ArrowRight>
  );
};

const PrevArrow = ({ onClick, currentSlide }) => {
  if (currentSlide === 0) return null;
  return (
    <ArrowLeft onClick={onClick}>
      <IcArrowLeft />
    </ArrowLeft>
  );
};

const ArrowBase = styled.div`
  position: absolute;
  top: 50%;
  z-index: 10;
  font-size: 2.4rem;
  color: #aaa;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #333;
  }
`;

const ArrowLeft = styled(ArrowBase)`
  left: -2rem;
`;

const ArrowRight = styled(ArrowBase)`
  right: -2rem;
`;
