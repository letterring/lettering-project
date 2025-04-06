import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';

import { getLetterDetail } from '/src/apis/letter';
import LetterImg1 from '/src/assets/images/letter/letter1.png';
import LetterImg2 from '/src/assets/images/letter/letter2.png';
import LetterImg3 from '/src/assets/images/letter/letter3.png';
import LetterImg4 from '/src/assets/images/letter/letter4.png';
import Header from '/src/components/common/Header';
import LetterContent from '/src/components/designs/Letter/LetterContent';
import { getLetterDate } from '/src/util/getFormatDate';

const LetterDetail = () => {
  const sliderRef = useRef(null);
  const { messageId } = useParams();
  const location = useLocation();

  const [letterData, setLetterData] = useState(location.state?.letterData || null);
  const [ImageData, setImageData] = useState(location.state?.ImageData || null);
  const [letterFont, setLetterFont] = useState(location.state?.letterFont || null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nickName, setNickName] = useState(null);
  const [nfcName, setNfcName] = useState(null);
  const [replyText, setReplyText] = useState(null);

  useEffect(() => {
    if (!letterData || !ImageData) {
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
        } = await getLetterDetail(messageId);

        const sentAt = getLetterDate(conditionTime);
        const readAt = getLetterDate(firstOpenedTime);

        const newImageData = [...letterImages, letterImages[0]];
        const newLetterContents = [
          ...letterContents,
          `${sentAt}에 보낸 편지를`,
          `${readAt}에 열었습니다.`,
        ];

        setNfcName(nfcName);
        setNickName(nickName);
        setImageData(newImageData);
        setLetterData(newLetterContents);
        setLetterFont(font);
        setReplyText(replyText);
      };

      fetchLetter();
    }
  }, [messageId, letterData, ImageData]);

  if (!letterData || !ImageData) {
    return <div>편지 정보를 가져오는 중입니다.</div>;
  }

  const contentConfig = [
    { template: 'main', imageCount: 1, textCount: 1, background: LetterImg1 },
    { template: 'film', imageCount: 5, textCount: 1, background: LetterImg2 },
    { template: 'polar', imageCount: 2, textCount: 1, background: LetterImg3 },
    { template: 'card', imageCount: 2, textCount: 2, background: LetterImg4 },
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
            font={letterFont}
            isActive={currentSlide === id}
            senderName={nickName}
            dearName={nfcName}
            messageId={messageId}
            replyText={replyText}
            isSender={false}
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
