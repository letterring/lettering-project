import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { downloadPostcardImage } from '../../../apis/postcard';
import PostcardBackDefalt from '../../../assets/images/postcard/defalt_back.png';
import PostcardBottomDefalt from '../../../assets/images/postcard/defalt_bottom.png';
import PostcardPaperDefalt from '../../../assets/images/postcard/defalt_paper.png';
import PostcardTopDefalt from '../../../assets/images/postcard/defalt_top.png';
import PostcardBackSsafy from '../../../assets/images/postcard/ssafy_back.png';
import PostcardBottomSsafy from '../../../assets/images/postcard/ssafy_bottom.png';
import PostcardPaperSsafy from '../../../assets/images/postcard/ssafy_paper.png';
import PostcardStampSsafy from '../../../assets/images/postcard/ssafy_stamp.png';
import PostcardTopSsafy from '../../../assets/images/postcard/ssafy_top.png';
import PostcardStampDefalt from '../../../assets/images/postcard/stamp.png';
import CancelButton from '../button/CancelButton';
import ConfirmButton from '../button/ConfirmButton';

const PostcardPreviewModal = ({
  isShowing,
  onClose,
  messageId,
  imageHighUrl,
  nfcName,
  content,
  font,
  flag = 'defalt',
}) => {
  const captureRef = useRef(null);
  const modalRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const postcardImages = {
    defalt: {
      top: PostcardTopDefalt,
      back: PostcardBackDefalt,
      bottom: PostcardBottomDefalt,
      paper: PostcardPaperDefalt,
      stamp: PostcardStampDefalt,
    },
    ssafy: {
      top: PostcardTopSsafy,
      back: PostcardBackSsafy,
      bottom: PostcardBottomSsafy,
      paper: PostcardPaperSsafy,
      stamp: PostcardStampSsafy,
    },
  };

  const selectedImages = postcardImages[flag];

  useEffect(() => {
    const loadImageBlob = async () => {
      setIsLoading(true);
      const { data, headers } = await downloadPostcardImage(imageHighUrl);
      const contentType = headers['content-type'] || 'image/jpeg';
      const blob = new Blob([data], { type: contentType });
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
      setIsLoading(false);
    };

    if (isShowing) {
      loadImageBlob();
    }
  }, [isShowing, imageHighUrl]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isShowing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShowing, onClose]);

  const handleSave = async () => {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
    });

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `letterring_postcard_${messageId}.png`);
      }
    });

    const base64 = canvas.toDataURL('image/png');
    window.ReactNativeWebView?.postMessage(base64);
  };

  if (!isShowing) return null;

  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <PreviewWrapper ref={captureRef}>
          <PostcardTopImg src={selectedImages.top} alt="봉투 윗부분" />
          <PostcardBackImg src={selectedImages.back} alt="봉투 뒷부분" />
          {isLoading ? (
            <LoadingMessage>이미지 불러오는 중...</LoadingMessage>
          ) : (
            <PostcardImage src={blobUrl} alt="엽서 사진" />
          )}
          <PostcardBottomImg src={selectedImages.bottom} alt="봉투 아랫부분" />

          <BigpaperImg src={selectedImages.paper} alt="엽서 내용" />
          <StampImg src={selectedImages.stamp} alt="우표" />
          <ContentBox $font={font}>
            <h1>사랑하는 {nfcName} 에게</h1>
            <p>{content}</p>
          </ContentBox>
        </PreviewWrapper>

        <ButtonGroup>
          <ConfirmButton btnName="다운로드" onClick={handleSave} disabled={isLoading} />
          <CancelButton btnName="닫기" onClick={onClose} />
        </ButtonGroup>
      </ModalContainer>
    </Backdrop>
  );
};

export default PostcardPreviewModal;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.Gray4};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// 모달
const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.White};
  border-radius: 12px;
  width: 100%;
  height: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

// 캡쳐
const PreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40rem;
  position: relative;
`;
const PostcardTopImg = styled.img`
  position: absolute;
  left: 0rem;
  top: 13rem;
  width: 20rem;
  transform: rotate(-3.71deg);
  z-index: 1;
`;

const PostcardBackImg = styled.img`
  position: absolute;
  left: 2rem;
  top: 20rem;
  width: 15rem;
  transform: rotate(-3.71deg);
  z-index: 1;
`;

const PostcardImage = styled.img`
  position: absolute;
  top: 13rem;
  left: 2.3rem;
  width: 15.3rem;
  min-height: 10rem;
  max-height: 18rem;
  z-index: 3;
  box-sizing: border-box;
  transform: rotate(-3.71deg);
  border: solid ${({ theme }) => theme.colors.Gray6};
`;

const LoadingMessage = styled.div`
  position: absolute;
  top: 13rem;
  left: 2.3rem;

  width: 15rem;
  height: 12rem;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 3;
  box-sizing: border-box;
  transform: rotate(-3.71deg);

  font-size: 1rem;
  border: solid ${({ theme }) => theme.colors.Gray6};
  color: ${({ theme }) => theme.colors.Gray2};
`;

const PostcardBottomImg = styled.img`
  position: absolute;
  left: 1.5rem;
  top: 20rem;
  width: 18rem;
  transform: rotate(-3.71deg);
  z-index: 4;
`;

const BigpaperImg = styled.img`
  position: absolute;
  right: 1rem;
  top: 18rem;
  width: 20rem;
  transform: rotate(5deg);
  z-index: 5;
`;

const ContentBox = styled.div`
  position: absolute;
  top: 20rem;
  right: 1.9rem;
  width: 18rem;
  height: 12rem;
  transform: rotate(5deg);
  z-index: 6;
  white-space: normal;

  h1 {
    ${({ theme, $font }) => theme.fonts[$font]};
    color: ${({ theme }) => theme.colors.Gray1};
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  p {
    ${({ theme, $font }) => theme.fonts[$font]};
    color: ${({ theme }) => theme.colors.Gray3};
    font-size: 1.2rem;
  }
`;

const StampImg = styled.img`
  position: absolute;
  top: 19rem;
  right: 1.1rem;
  transform: rotate(5deg);
  z-index: 7;

  width: 8rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;
