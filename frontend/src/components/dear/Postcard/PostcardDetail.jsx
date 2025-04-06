import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getHighImageUrl, getPostcardDetail, markPostcardAsUnread } from '/src/apis/postcard';
import PostcardImg from '/src/assets/images/postcard/postcard.png';
import StampImg from '/src/assets/images/postcard/stamp.png';
import ReplyComponent from '/src/components/designs/ReplyComponent';
import { getFontStyle } from '/src/util/getFont';

import Header from '../../common/Header';
import PostcardPreviewModal from '../../common/modal/PostcardPreviewModal';
import ReplyComponent from './ReplyComponent';

const PostcardDetail = () => {
  const { messageId } = useParams();
  const location = useLocation();

  const [flipped, setFlipped] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const [postcard, setPostcard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [highImageUrl, setHighImageUrl] = useState('');
  const [userFont, setUserFont] = useState('GOMSIN1');

  const handleInformMsg = () => {
    setFlipped((prev) => !prev);
    setIsShow(false);
  };

  const handleMarkAsUnread = async () => {
    await markPostcardAsUnread(messageId);
    alert('안읽음 처리 완료!');
  };

  useEffect(() => {
    const fetchPostcard = async () => {
      try {
        const data = await getPostcardDetail(messageId);
        setPostcard(data);
        setUserFont(getFontStyle(data.font));
      } catch (error) {
        console.error('엽서 데이터 가져오기 실패', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostcard();
  }, [messageId]);

  if (isLoading || !postcard) return <div>엽서를 불러오는 중입니다...</div>;

  const { imageUrl, content, nfcName, replyText } = postcard;

  const handleOpenPreviewModal = async () => {
    const { imageHighUrl } = await getHighImageUrl(messageId);
    setHighImageUrl(imageHighUrl);
    setIsPreviewOpen(true);
  };

  return (
    <StPageWrapper>
      <Header headerName="Lettering" />
      <StWrapper>
        {isLoading ? (
          <div>엽서를 불러오는 중입니다...</div>
        ) : (
          <StFlipContainer onClick={handleInformMsg}>
            <StInform $isShow={isShow}>엽서를 눌러 편지 내용을 확인해보세요.</StInform>
            <StFlipCard $flipped={flipped}>
              <StCardFace className="front">
                <StPostcardWhite />
                <StPostcardImage>
                  <img src={imageUrl} alt="엽서사진" />
                </StPostcardImage>
              </StCardFace>
              <StCardFace className="back">
                <StPostcard src={PostcardImg} alt="엽서" />
                <StPostcardContent>
                  <StPostcardStamp src={StampImg} alt="우표" />
                  <StPostcardTitle $font={userFont}>
                    사랑하는 {nfcName || '너'}에게,
                  </StPostcardTitle>
                  <StPostcardText $font={userFont}>{content}</StPostcardText>
                </StPostcardContent>
              </StCardFace>
            </StFlipCard>
          </StFlipContainer>
        )}

        <SimpleButton onClick={handleMarkAsUnread}>안읽음 처리</SimpleButton>

        <SimpleButton onClick={handleOpenPreviewModal}>고화질 이미지 다운로드</SimpleButton>

        <PostcardPreviewModal
          isShowing={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          messageId={messageId}
          imageHighUrl={highImageUrl}
          nfcName={nfcName}
          content={content}
          font={userFont}
        />

        <ReplyComponent
          messageId={messageId}
          replyText={replyText}
          dearName={nfcName}
          isSender={false}
        />
      </StWrapper>
    </StPageWrapper>
  );
};

export default PostcardDetail;

export const SimpleButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: none;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
`;

const StPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding-top: 10rem;
  gap: 2rem;
`;

const StInform = styled.div`
  color: ${({ theme }) => theme.colors.Gray4};
  ${({ theme }) => theme.fonts.EduBody2};
  padding: 1rem;

  opacity: ${({ $isShow }) => ($isShow ? '1' : '0')};
`;

const StFlipContainer = styled.div`
  perspective: 100rem;
  width: 30rem;
  height: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 7rem; */
`;

const StFlipCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  cursor: pointer;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const StCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;

  &.front {
    z-index: 2;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &.back {
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

const StPostcard = styled.img`
  position: absolute;
  width: 29rem;
  height: 100%;
  z-index: 2;
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
  top: 1rem;
  right: 2rem;
  border-radius: 50%;
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

const StPostcardWhite = styled.img`
  position: absolute;
  width: 100%;
  z-index: 2;
  background-color: white;
`;

const StPostcardImage = styled(motion.div)`
  position: absolute;
  top: 0.65rem;
  left: 0.85rem;
  width: 28.3rem;
  height: 19rem;
  z-index: 3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
