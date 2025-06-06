import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';

import { getSentLetterDetail } from '/src/apis/letter';
import LetterImg1 from '/src/assets/images/congratsLetter/background1.png';
import LetterImg2 from '/src/assets/images/congratsLetter/pink_background.png';
import Header from '/src/components/common/Header';
import { getLetterDate } from '/src/util/getFormatDate';

import CongratsLetterContent from '../../../designs/CongratsLetter/CongratsLetterContent';

const CongratsLetterDetail = () => {
  const sliderRef = useRef(null);
  const { messageId } = useParams();

  const [letterData, setLetterData] = useState(null);
  const [ImageData, setImageData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [letterFont, setLetterFont] = useState(null);
  const [nickName, setNickName] = useState(null);
  const [nfcName, setNfcName] = useState(null);
  const [replyText, setReplyText] = useState(null);

  useEffect(() => {
    const fetchLetter = async () => {
      const {
        letterContents,
        letterImages,
        font,
        conditionTime,
        firstOpenedTime,
        nfcName,
        nickName,
        replyText,
      } = await getSentLetterDetail(messageId);

      const sentAt = getLetterDate(conditionTime);
      const readAt = firstOpenedTime ? getLetterDate(firstOpenedTime) : null;

      const originalImageData = letterImages.map((img, index) => ({
        ...img,
        index,
      }));

      const newImageData = [...originalImageData, originalImageData[0]];
      const newLetterContents = [
        ...letterContents,
        `${sentAt}에 보낸 편지를`,
        readAt ? `${readAt}에 열었습니다.` : '아직 읽지 않았습니다.',
      ];

      setNfcName(nfcName);
      setNickName(nickName);
      setImageData(newImageData);
      setLetterData(newLetterContents);
      setLetterFont(font);
      setReplyText(replyText);
    };

    fetchLetter();
  }, [messageId]);

  if (!letterData || !ImageData) {
    return <div>편지 정보를 가져오는 중입니다.</div>;
  }

  const contentConfig = [
    { template: 'main', imageCount: 1, textCount: 1, background: LetterImg1 },
    { template: 'second', imageCount: 1, textCount: 1, background: LetterImg2 },
    { template: 'answer', imageCount: 1, textCount: 2, background: null },
  ];

  let imageIndex = 0;
  let textIndex = 0;

  const contents = contentConfig.map(({ template, imageCount, textCount, background }) => {
    const images = ImageData.slice(imageIndex, imageIndex + imageCount);
    const text = letterData.slice(textIndex, textIndex + textCount);

    imageIndex += imageCount;
    textIndex += textCount;

    return {
      template,
      images: imageCount === 1 ? images[0] : images,
      text,
      background,
    };
  });

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
    afterChange: setCurrentSlide,
  };

  return (
    <>
      <StPageWrapper>
        <Header headerName="Congratulations" />

        <StyledSlider ref={sliderRef} {...settings}>
          {contents.map((item, id) => (
            <CongratsLetterContent
              key={id}
              template={item.template}
              images={item.images}
              text={item.text}
              background={item.background}
              font={letterFont}
              isActive={currentSlide === id}
              senderName={nickName}
              dearName={nfcName}
              messageId={messageId}
              replyText={replyText}
              isSender={true}
            />
          ))}
        </StyledSlider>
      </StPageWrapper>
    </>
  );
};

export default CongratsLetterDetail;

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
  height: 100%;

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
