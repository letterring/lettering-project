import { useRef, useState } from 'react';
import styled from 'styled-components';

import { IcImageUpload, IcImageUploadTrue } from '../../../assets/icons';
import PostcardImg from '../../../assets/icons/postcard/postcard.png';
import StampImg from '../../../assets/icons/postcard/stamp.png';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';

const PostcardWriting = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [text, setText] = useState('');
  const textLimit = 120;

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (value.length <= textLimit) {
      setText(value);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      //5MB
      alert('5MB가 넘습니다!');
      event.target.type = '';
      event.target.type = 'file';
      return;
    }

    if (file.name.endsWith('.heic') || file.name.endsWith('.heif')) {
      //heic 이미지 처리
      const newFile = await convertHeicToJpeg(file);
      if (newFile) {
        setImageFile(newFile);
        setImage(URL.createObjectURL(newFile));
      }
    } else {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
            <StPostcardTitle>사랑하는 너에게,</StPostcardTitle>
            <StPostcardStamp src={StampImg} alt="우표" />
            <StPostcardText>
              오늘 아침 눈을 뜨자마자 달력을 보니 우리 기념일이라는 사실에 마음이 설렌다. 우리가
              함께 보낸 시간이 벌써 이렇게 쌓였다는 게 믿기지 않을 정도로 빠르게 느껴져. 처음 만났던
              순간부터 지금까지 함께한 모든 기억들이 하나둘 떠오르면서 마음이 참 따뜻해졌어.
            </StPostcardText>
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
  justify-content: space-between;
  padding: 3rem;
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
  width: 30rem;
`;
