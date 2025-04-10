import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getUserFont } from '/src/apis/user';
import LetterImg1 from '/src/assets/images/congratsLetter/background1.png';
import LetterImg2 from '/src/assets/images/congratsLetter/pink_background.png';
import { getFontStyle } from '/src/util/getFont';

import { IcArrowLeft } from '../../../assets/icons';
import { IcArrowRight2 } from '../../../assets/icons';
import { LetterImageList, LetterTextList } from '../../../recoil/atom';
import Header from '../../common/Header';
import LetterEditor from './LetterEditor';

const LetterPreview = () => {
  const [imageList, setImageList] = useRecoilState(LetterImageList);
  const [letterTextList, setLetterTextList] = useRecoilState(LetterTextList);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [userFont, setUserFont] = useState(undefined);

  const contentConfig = [
    { template: 'main', imageCount: 1, textCount: 1, background: LetterImg1 },
    { template: 'second', imageCount: 1, textCount: 1, background: LetterImg2 },
    { template: 'end', imageCount: 1, textCount: 0, background: null },
  ];

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
    const fetchFont = async () => {
      const { font } = await getUserFont();
      setUserFont(getFontStyle(font));
    };
    fetchFont();
  }, []);

  const handleTextChange = (index, value) => {
    const updated = [...letterTextList];
    updated[index] = value;
    setLetterTextList(updated);
  };

  const handleImageSet = (newImage, index) => {
    setImageList((prev) => {
      const newList = [...prev];
      newList[index] = newImage;
      return newList;
    });
  };

  const contents = contentConfig.map(({ template, background }, index) => ({
    template,
    images: imageList[index],
    background,
  }));

  return (
    <StLetterPreview>
      <Header headerName="편지쓰기" missBack={true} />
      <ContentWrapper>
        <StyledSlider ref={sliderRef} {...settings}>
          {contents.map((item, index) => (
            <LetterEditor
              key={index}
              template={item.template}
              images={item.images}
              background={item.background}
              textList={letterTextList}
              textStartIndex={item.textStartIndex}
              onTextChange={handleTextChange}
              font={userFont}
              onImageSet={handleImageSet}
            />
          ))}
        </StyledSlider>
      </ContentWrapper>
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
