import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { enhanceWithImage, refineWithImage, updateRedisMessage } from '/src/apis/fastapi';
import { getUserFont } from '/src/apis/user';
import LetterImg1 from '/src/assets/images/letter/letter1.png';
import LetterImg2 from '/src/assets/images/letter/letter2.png';
import LetterImg3 from '/src/assets/images/letter/letter3.png';
import LetterImg4 from '/src/assets/images/letter/letter4.png';
import { getFontStyle } from '/src/util/getFont';

import { IcArrowLeft, IcArrowRight2 } from '../../../assets/icons';
import { LetterImageList, LetterTextList, RedisMessageKey } from '../../../recoil/atom';
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
  const [refineSuggestions, setRefineSuggestions] = useState([]);
  const [enhanceTips, setEnhanceTips] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [userFont, setUserFont] = useState(undefined);
  const [isRefining, setIsRefining] = useState(false);
  const redisKey = useRecoilValue(RedisMessageKey);

  const setLetterTextList = useSetRecoilState(LetterTextList);
  const IMAGE_BASE_URL = import.meta.env.VITE_FAST_API_BASE_URL + '/static/uploads/';

  const contentConfig = [
    { template: 'main', imageCount: 1, textCount: 1, background: LetterImg1 },
    { template: 'film', imageCount: 5, textCount: 1, background: LetterImg2 },
    { template: 'polar', imageCount: 2, textCount: 1, background: LetterImg3 },
    { template: 'card', imageCount: 2, textCount: 2, background: LetterImg4 },
    { template: 'end', imageCount: 1, textCount: 0, background: null },
  ];

  let imageIndex = 0;
  let textIndex = 0;
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

  useEffect(() => {
    if (localImageList && localImageList.length > 0) {
      const images = localImageList.map((img) => img.url);
      setImageList(images);
    } else if (postcard?.images?.length > 0) {
      const images = postcard.images.map((img) => `${IMAGE_BASE_URL}${img.filename}`);
      setImageList(images);
    }

    if (segmentedText && segmentedText.length > 0) {
      setTextList(segmentedText);
    }
  }, [localImageList, postcard, segmentedText]);

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

  // AI
  const handleUseRefineText = async (suggestionList) => {
    const updated = [...textList];
    const { textStartIndex, textCount } = contents[currentSlide];
    const slicedSuggestions = suggestionList.slice(0, textCount);

    for (let i = 0; i < textCount; i++) {
      updated[textStartIndex + i] = slicedSuggestions[i] || '';
    }

    console.log('[🔁 업데이트될 텍스트 리스트]', updated);
    setTextList(updated);
    setLetterTextList(updated);
    setActiveModal(null);

    // if (redisKey) {
    //   const joinedMessage = updated.join('\n\n');
    //   await updateRedisMessage(redisKey, joinedMessage);
    // }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    const fetchAiSuggestions = async () => {
      if (!['edit', 'add'].includes(activeModal)) return;

      const { textStartIndex, textCount } = contents[currentSlide];
      const slideTexts = textList.slice(textStartIndex, textStartIndex + textCount);

      const filenames = getFilenamesFromPostcard(currentSlide);

      console.log('[🖼️ AI 요청용 이미지 파일명]', filenames);
      console.log('[📝 슬라이드 텍스트]', slideTexts);

      if (!filenames || filenames.length === 0) return;

      setIsRefining(true);

      if (activeModal === 'edit') {
        const result = await refineWithImage({ slideTexts, filenames });
        if (Array.isArray(result)) {
          setRefineSuggestions(result);
        }
      }

      // if (activeModal === 'add') {
      //   const result = await enhanceWithImage({ text: slideText, filenames });
      //   if (result) setEnhanceTips(result);
      // }

      setIsRefining(false);
    };

    fetchAiSuggestions();
  }, [activeModal, currentSlide]);

  const getFilenamesFromPostcard = (slideIndex) => {
    const imageIndexes = computeImageIndexesPerSlide()[slideIndex];
    return imageIndexes.map((idx) => postcard?.images?.[idx]?.filename).filter(Boolean); // undefined 제거
  };

  const computeImageIndexesPerSlide = () => {
    const map = [];
    let imageIndex = 0;

    for (let i = 0; i < contentConfig.length; i++) {
      const imageCount = contentConfig[i].imageCount;
      const indexes = Array.from({ length: imageCount }, (_, j) => imageIndex + j);
      map.push(indexes);
      imageIndex += imageCount;
    }

    return map;
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
      {/* {activeModal === 'add' && (
        <AiEnhanceModal onClose={closeModal} font={userFont} tips={enhanceTips} />
      )} */}
      {activeModal === 'edit' && (
        <AiRefineModal
          onClose={closeModal}
          font={userFont}
          suggestions={refineSuggestions}
          onUse={handleUseRefineText}
          isLoading={isRefining}
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
