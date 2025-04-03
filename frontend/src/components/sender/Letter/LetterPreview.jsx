import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getUserFont } from '/src/apis/user';
import LetterImg1 from '/src/assets/images/letter/letter1.png';
import LetterImg2 from '/src/assets/images/letter/letter2.png';
import LetterImg3 from '/src/assets/images/letter/letter3.png';
import LetterImg4 from '/src/assets/images/letter/letter4.png';
import { getFontStyle } from '/src/util/getFont';

import { IcArrowLeft, IcArrowRight2 } from '../../../assets/icons';
import { LetterImageList } from '../../../recoil/atom';
import Header from '../../common/Header';
import AiButton from './AiButton';
import AiEnhanceModal from './AiEnhanceModal';
import AiRefineModal from './AiRefineModal';
import LetterEditor from './LetterEditor';

const LetterPreview = () => {
  const location = useLocation();
  const postcard = location.state?.postcard;
  const segmentedText = location.state?.segmentedText;

  const localImageList = useRecoilValue(LetterImageList);

  const [imageList, setImageList] = useState([]);
  const [textList, setTextList] = useState([]);

  const IMAGE_BASE_URL = import.meta.env.VITE_FAST_API_BASE_URL + '/static/uploads/';

  useEffect(() => {
    // ✅ 이미지: Recoil 무조건 사용
    if (localImageList && localImageList.length > 0) {
      const images = localImageList.map((img) => img.url);
      setImageList(images);
    } else if (postcard?.images?.length > 0) {
      const images = postcard.images.map((img) => `${IMAGE_BASE_URL}${img.filename}`);
      setImageList(images);
    }

    // ✅ 텍스트: segment 결과 우선 사용
    if (segmentedText && segmentedText.length > 0) {
      setTextList(segmentedText);
    }
  }, [localImageList, postcard, segmentedText]);

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
    const images = imageList.slice(imageIndex, imageIndex + imageCount);
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
    swipe: false,
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
