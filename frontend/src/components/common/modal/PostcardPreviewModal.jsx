import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import PostcardImg from '/src/assets/images/postcard/postcard.png';
import StampImg from '/src/assets/images/postcard/stamp.png';

import { downloadPostcardImage } from '../../../apis/postcard';
import FrontEnvelop from '../../../assets/images/postcard/bottom_fold.png'; // 편지 봉투 앞부분
import LeftPaper from '../../../assets/images/postcard/postcard_paper.png'; // 왼쪽 편지지
import RightPaper from '../../../assets/images/postcard/postcard_paper2.png'; // 오른쪽 편지지
import BackEnvelop from '../../../assets/images/postcard/top_fold.png'; // 편지 봉투 뒷부분
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
          <LeftSection>
            <LeftPaperImg src={LeftPaper} alt="left paper" />
            <BackImg src={BackEnvelop} alt="back" />
            <FrontImg src={FrontEnvelop} alt="front" />
          </LeftSection>

          <RightSection>
            <LeftPaperWrapper>
              <RightPaperImg src={RightPaper} alt="right paper" />
              <TextWrapper>
                <h3>사랑하는 {nfcName || '너'}에게,</h3>
                <p>{content}</p>
              </TextWrapper>
            </LeftPaperWrapper>
          </RightSection>
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

// 모달
const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.White};
  border-radius: 12px;
  width: 30rem;
  padding: 1rem;
`;

// 캡쳐
const PreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  position: relative;
`;

const LeftSection = styled.div`
  position: relative;
  width: 30rem;
  height: 10rem;
  border: solid black;
`;

const BackImg = styled.img`
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const RightPaperImg = styled.img`
  position: absolute;
  width: 100%;
  z-index: 2;
`;

const FrontImg = styled.img`
  position: absolute;
  width: 100%;
  z-index: 3;
`;

const RightSection = styled.div`
  position: relative;
  width: 30rem;
  height: 10rem;
  border: solid black;
`;

const LeftPaperWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LeftPaperImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  position: relative;
  padding: 2rem;
  z-index: 2;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
    line-height: 1.4;
    white-space: pre-wrap;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`;
