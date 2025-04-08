import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getUserFont } from '../../../apis/user';
import { IcImageUpload, IcImageUploadTrue } from '../../../assets/icons';
import BullonImg from '../../../assets/images/congratsletter/bullons.png';
import ConfettiImg from '../../../assets/images/congratsletter/confetti2.png';
import { LetterImageList } from '../../../recoil/atom';
import { getFontStyle } from '../../../util/getFont';

const SecondTemplateEditor = ({ onImageSet }) => {
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
    if (file.name.endsWith('.heic') || file.name.endsWith('.heif')) {
      processedFile = await convertHeicToJpeg(file);
    }

    const imageUrl = URL.createObjectURL(processedFile);
    const newEntry = { file: processedFile, url: imageUrl };

    if (onImageSet) {
      onImageSet(newEntry, 1);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <StWrapper>
      <StConffetti src={ConfettiImg} alt="컨페티" />
      <ImageUpload
        onClick={triggerFileInput}
        $isImage={letterImageList[1]}
        style={{ backgroundImage: `url(${letterImageList[1]?.url || ''})` }}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/heic"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        {letterImageList[1] ? <IcImageUploadTrue /> : <IcImageUpload />}
        <h3>{letterImageList[1] ? '사진 재업로드하기' : '사진 업로드하기'}</h3>
        <p>PNG, JPG, HEIC 형식만 지원합니다.</p>
      </ImageUpload>
      <StTextImage src={BullonImg} alt="레터링" />
    </StWrapper>
  );
};

export default SecondTemplateEditor;

const StWrapper = styled.div`
  width: 100%;
  height: 22rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: start;
  margin-bottom: 10rem;
`;

const StConffetti = styled.img`
  position: absolute;
  top: -3.7rem;
  right: center;
  width: 27rem;
  z-index: 1;
`;

const StTextImage = styled.img`
  position: absolute;
  top: 13rem;
  left: center;
  width: 27rem;
  z-index: 3;
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
  top: 1.5rem;

  background-color: white;
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
