import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getUserFont } from '../../../apis/user';
import { IcImageUpload, IcImageUploadTrue } from '../../../assets/icons';
import confettiImg from '../../../assets/images/congratsLetter/confetti.png';
import RibbonImg from '../../../assets/images/congratsLetter/ribbon.png';
import { LetterImageList } from '../../../recoil/atom';
import { getFontStyle } from '../../../util/getFont';

const MainTemplateEditor = ({ onImageSet }) => {
  const [letterImageList, setLetterImageList] = useRecoilState(LetterImageList);
  const [userFont, setUserFont] = useState(undefined);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchFont = async () => {
      const { font } = await getUserFont();
      setUserFont(getFontStyle(font));
    };
    fetchFont();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('4MB 이하의 용량만 업로드 가능합니다.');
      return;
    }

    let processedFile = file;
    if (file.name.endsWith('.heic') || file.name.endsWith('.HEIC')) {
      processedFile = await convertHeicToJpeg(file);
    }

    const imageUrl = URL.createObjectURL(processedFile);
    const newEntry = { file: processedFile, url: imageUrl };

    if (onImageSet) {
      onImageSet(newEntry, 0);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <StWrapper>
      <StConfetti src={confettiImg} alt="Confetti" />
      <ImageUpload
        onClick={triggerFileInput}
        $isImage={letterImageList[0]}
        style={{ backgroundImage: `url(${letterImageList[0]?.url || ''})` }}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/heic"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        {letterImageList[0] ? <IcImageUploadTrue /> : <IcImageUpload />}
        <h3>{letterImageList[0] ? '사진 재업로드하기' : '사진 업로드하기'}</h3>
        <p>PNG, JPG, HEIC 형식만 지원합니다.</p>
      </ImageUpload>
      <StRibbon src={RibbonImg} alt="Ribbon" />
    </StWrapper>
  );
};

export default MainTemplateEditor;

const StWrapper = styled.div`
  width: 100%;
  height: 22rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6rem;
`;

const StConfetti = styled.img`
  position: absolute;
  top: -4.8rem;
  right: center;
  width: 27.2rem;
  z-index: 1;
`;

const StRibbon = styled.img`
  position: absolute;
  top: 15rem;
  left: -3.3rem;
  width: 29.2rem;
  z-index: 4;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 85%;
  height: 85%;

  position: relative;

  background-color: #ececec;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  z-index: 3;

  ${({ $isImage }) =>
    $isImage &&
    `&:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 2;
    }`}

  svg {
    z-index: 3;
  }

  h3 {
    color: ${({ theme, $isImage }) => ($isImage ? theme.colors.White : theme.colors.Gray1)};
    ${({ theme }) => theme.fonts.Title4};
    z-index: 3;
  }

  p {
    color: ${({ theme, $isImage }) => ($isImage ? theme.colors.White : '#464656')};
    ${({ theme }) => theme.fonts.Body4};
    z-index: 3;
  }
`;
