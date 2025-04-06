import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import PostcardImg from '/src/assets/images/postcard/postcard.png';
import StampImg from '/src/assets/images/postcard/stamp.png';

import { downloadPostcardImage } from '../../../apis/postcard';

const PostcardPreviewModal = ({
  isShowing,
  onClose,
  messageId,
  imageHighUrl,
  nfcName,
  content,
  font,
}) => {
  const captureRef = useRef(null);
  const modalRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImageBlob = async () => {
      try {
        setIsLoading(true);
        const { data, headers } = await downloadPostcardImage(imageHighUrl);
        const contentType = headers['content-type'] || 'image/jpeg';
        const blob = new Blob([data], { type: contentType });
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (error) {
        alert('고화질 이미지를 불러오지 못했습니다.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
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
  };

  if (!isShowing) return null;

  return (
    <Backdrop>
      <ModalContainer ref={modalRef}>
        <PreviewWrapper ref={captureRef}>
          <PostcardBox>
            {isLoading ? (
              <LoadingMessage>이미지를 불러오는 중입니다...</LoadingMessage>
            ) : (
              <PostcardImage src={blobUrl} alt="엽서 이미지" />
            )}
          </PostcardBox>

          <PostcardBox>
            <StContentCard>
              <StPostcardBackground src={PostcardImg} alt="엽서 배경" />
              <StStamp src={StampImg} alt="우표" />
              <StPostcardContent>
                <StPostcardTitle $font={font}>사랑하는 {nfcName || '너'}에게,</StPostcardTitle>
                <StPostcardText $font={font}>{content}</StPostcardText>
              </StPostcardContent>
            </StContentCard>
          </PostcardBox>
        </PreviewWrapper>

        <ButtonGroup>
          <button onClick={handleSave}>이미지 저장</button>
          <button onClick={onClose}>닫기</button>
        </ButtonGroup>
      </ModalContainer>
    </Backdrop>
  );
};

export default PostcardPreviewModal;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 32rem;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const PostcardBox = styled.div`
  width: 30rem;
  height: 20rem;
  border: 1px solid #ddd;
  position: relative;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMessage = styled.div`
  font-size: 1rem;
  color: gray;
`;

const PostcardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StContentCard = styled.div`
  position: relative;
  width: 30rem;
  height: 23rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: white;
`;

const StPostcardBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const StPostcardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
`;

const StStamp = styled.img`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  width: 8rem;
  z-index: 3;
`;

const StPostcardTitle = styled.div`
  margin-bottom: 1rem;
  #{({ theme, $font }) => theme.fonts[$font]};
`;

const StPostcardText = styled.div`
  #{({ theme, $font }) => theme.fonts[$font]};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    background-color: #6c63ff;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #574fdd;
    }
  }
`;
