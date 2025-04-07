import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import PostcardImg from '/src/assets/images/postcard/postcard.png';
import StampImg from '/src/assets/images/postcard/stamp.png';

import { downloadPostcardImage } from '../../../apis/postcard';
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
}) => {
  const captureRef = useRef(null);
  const modalRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
          <ConfirmButton btnName="다운로드" onClick={handleSave} />
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

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.White};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 30rem;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const PostcardBox = styled.div`
  width: rem;
  height: 23rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMessage = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.Gray4};
`;

const PostcardImage = styled.img`
  width: 30rem;
  height: 23rem;
  object-fit: cover;
`;
const StContentCard = styled.div`
  position: relative;
  width: 30rem;
  height: 23rem;
  overflow: hidden;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 3rem;
  box-sizing: border-box;
  z-index: 2;
`;

const StStamp = styled.img`
  z-index: 3;
  position: absolute;
  width: 10rem;
  top: 1rem;
  right: 2rem;
  border-radius: 50%;
`;

const StPostcardTitle = styled.div`
  margin-bottom: 1rem;
  ${({ theme, $font }) => theme.fonts[$font]};
  color: ${({ theme }) => theme.colors.Gray2};
  word-wrap: break-word;
  max-height: 13rem;
  overflow: auto;
  white-space: normal;
`;

const StPostcardText = styled.div`
  ${({ theme, $font }) => theme.fonts[$font]};
  color: ${({ theme }) => theme.colors.Gray3};
  word-wrap: break-word;
  max-height: 13rem;
  overflow: auto;
  white-space: normal;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`;
