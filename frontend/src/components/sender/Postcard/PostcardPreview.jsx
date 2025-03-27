import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import PostcardImg from '../../../assets/images/postcard/postcard.png';
import StampImg from '../../../assets/images/postcard/stamp.png';
import { PostcardImage, PostcardImageFile, PostcardText } from '../../../recoil/atom';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';

const PostcardWriting = () => {
  const [image, setImage] = useRecoilState(PostcardImage);
  const [text, setText] = useRecoilState(PostcardText);
  const [imageFile, setImageFile] = useRecoilState(PostcardImageFile);
  console.log(image, text);
  console.log(imageFile);

  return (
    <StPageWrapper>
      <Header headerName="엽서 쓰기" />

      <StContentWrapper>
        {/* 이미지 업로드 박스 */}
        <StUploadBox>
          <ImageUpload
            $isImage={image ? true : false}
            style={{ backgroundImage: `url(${image})` }}
          />
        </StUploadBox>

        {/* 엽서 뒷면 텍스트 박스 */}
        <StTextBox>
          <StPostcardContent>
            <StPostcardStamp src={StampImg} alt="우표" />
            <StPostcardTitle>사랑하는 너에게,</StPostcardTitle>
            <StPostcardText>{text}</StPostcardText>
          </StPostcardContent>
        </StTextBox>
      </StContentWrapper>

      <StButtonWrapper>
        <LongButton onClick={() => navigate('/postcard/preview')} btnName="엽서 전송하기" />
      </StButtonWrapper>
    </StPageWrapper>
  );
};

export default PostcardWriting;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-bottom: 4rem;
`;

const StUploadBox = styled.div`
  width: 28rem;
  height: 20rem;
  border: 0.1rem solid #ccc;
  padding: 1rem;
  background-color: white;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  position: relative;

  background-color: #ececec;
  background-image: ${({ $imageUrl }) => ($imageUrl ? `url(${$imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  border-radius: 0;
`;

const StTextBox = styled.div`
  width: 30rem;
  height: 23rem;
  background-image: url(${PostcardImg});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StPostcardContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 3rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  z-index: 3;
`;

const StPostcardTitle = styled.div`
  ${({ theme }) => theme.fonts.Gomsin2};
  margin-bottom: 3rem;
  z-index: 3;
`;

const StPostcardStamp = styled.img`
  position: absolute;
  width: 10rem;
  top: 1rem;
  right: 2rem;
  border-radius: 50%;
  z-index: 3;
`;

const StPostcardText = styled.div`
  ${({ theme }) => theme.fonts.Gomsin2};
  word-wrap: break-word;
  max-height: 13rem;
  overflow: auto;
  white-space: normal;
  z-index: 3;
`;

const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
`;
