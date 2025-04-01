import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { LetterImageList, LetterText, UserFont } from '../../../recoil/atom';
import { getFontStyle } from '../../../util/getFont';
import Header from '../../common/Header';

const LetterWriting = () => {
  const navigate = useNavigate();

  const [ImageList, setImageList] = useState([]);
  const [letterContent, setLetterContent] = useState('');

  const fontStyle = getFontStyle(useRecoilValue(UserFont));

  const fileInputRef = useRef(null);

  const setLetterImages = useSetRecoilState(LetterImageList);
  const setLetterText = useSetRecoilState(LetterText);

  const handleLetterChange = (e) => {
    setLetterContent(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const totalImages = [...ImageList, ...newImages].slice(0, 10);
    setImageList(totalImages);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImageList((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const isValid = ImageList.length >= 8;

  const handleSubmit = async () => {
    setLetterImages(ImageList);
    setLetterText(letterContent);

    navigate('/letter/preview');
  };

  return (
    <StLetterWritingWrapper>
      <Header headerName="편지쓰기" />
      <WritingContentWrapper>
        <ContentWrapper>
          <Text>이미지 업로드</Text>
          <ImagesWrapper>
            {ImageList.map((img, index) => (
              <ImagePreview key={index}>
                <PreviewImg src={img.url} alt={`uploaded-${index}`} />
                <RemoveBtn onClick={() => handleRemoveImage(index)}>×</RemoveBtn>
              </ImagePreview>
            ))}
            {ImageList.length < 10 && (
              <AddImageLabel>
                +
                <ImageInput
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </AddImageLabel>
            )}
          </ImagesWrapper>
        </ContentWrapper>
        <ContentWrapper>
          <Text>사랑하는 너에게</Text>
          <InputTextBox
            maxLength={600}
            value={letterContent}
            onChange={handleLetterChange}
            $fontStyle={fontStyle}
          />
          <FooterWrapper>
            {!isValid ? <WarnText>사진은 8장 이상 필요합니다.</WarnText> : <WarnText />}
            <CharCount>{letterContent.length} / 600</CharCount>
            <SubmitButton disabled={!isValid} $isValid={isValid} onClick={handleSubmit}>
              입력완료
            </SubmitButton>
          </FooterWrapper>
        </ContentWrapper>
      </WritingContentWrapper>
    </StLetterWritingWrapper>
  );
};

export default LetterWriting;

const StLetterWritingWrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.White};
`;

const WritingContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 8rem 3rem;
  gap: 2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Title4};
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 11rem;
  gap: 0.5rem;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.Red2};
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
`;

const AddImageLabel = styled.label`
  width: 5rem;
  height: 5rem;
  box-sizing: border-box;
  border: 1px dashed ${({ theme }) => theme.colors.Orange1};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.Orange1};
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;

const InputTextBox = styled.textarea`
  width: 100%;
  height: 36rem;

  padding: 1rem;
  border: solid 1px ${({ theme }) => theme.colors.Orange1};
  border-radius: 0.75rem;
  outline: none;

  resize: none;
  overflow-y: auto;
  box-sizing: border-box;

  ${({ theme, $fontStyle }) => theme.fonts[$fontStyle]};
`;

const FooterWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const WarnText = styled.p`
  width: 13rem;
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Body4};
`;

const CharCount = styled.p`
  width: 5rem;
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Body3};
`;

const SubmitButton = styled.button`
  width: 6rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${({ theme, $isValid }) => ($isValid ? theme.colors.Red2 : theme.colors.Gray4)};
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Body3};
  cursor: ${({ $isValid }) => ($isValid ? 'pointer' : 'not-allowed')};
`;
