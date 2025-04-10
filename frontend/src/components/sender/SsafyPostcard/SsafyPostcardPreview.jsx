import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getFontStyle } from '/src/util/getFont';

import { getUserFont } from '../../../apis/user';
import PostcardImg from '../../../assets/images/ssafyPostcard/postcard.png';
import StampImg from '../../../assets/images/ssafyPostcard/stamp.png';
import { PostcardImage, PostcardImageFile, PostcardText } from '../../../recoil/atom';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';

const PostcardWriting = () => {
  const navigate = useNavigate();
  const [image, setImage] = useRecoilState(PostcardImage);
  const [text, setText] = useRecoilState(PostcardText);
  const [imageFile, setImageFile] = useRecoilState(PostcardImageFile);
  const [userFont, setUserFont] = useState(undefined);

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const { font } = await getUserFont();
        setUserFont(getFontStyle(font));
      } catch (err) {
        console.error('폰트 로딩 실패');
      }
    };

    fetchFont();
  }, []);

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
            <StPostcardTitle $font={userFont}>고생한 너에게,</StPostcardTitle>
            <StPostcardText $font={userFont}>{text}</StPostcardText>
          </StPostcardContent>
        </StTextBox>
      </StContentWrapper>

      <StButtonWrapper>
        <LongButton onClick={() => navigate('/selectdear')} btnName="엽서 전송하기" />
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
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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
  ${({ theme, $font }) => theme.fonts[$font]};
  margin-bottom: 3rem;
  z-index: 3;
`;

const StPostcardStamp = styled.img`
  position: absolute;
  width: 10rem;
  top: 2rem;
  right: 1.5rem;
  z-index: 3;
`;

const StPostcardText = styled.div`
  ${({ theme, $font }) => theme.fonts[$font]};
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
