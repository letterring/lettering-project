import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getSentPostcardDetail } from '/src/apis/postcard';
import DummyImg from '/src/assets/dummy/postcard.jpg';
import PostcardImg from '/src/assets/images/ssafyPostcard/postcard.png';
import StampImg from '/src/assets/images/ssafyPostcard/stamp.png';
import Header from '/src/components/common/Header';
import ReplyComponent from '/src/components/designs/ReplyComponent';
import { getFontStyle } from '/src/util/getFont';

const PostcardDetail = () => {
  const [flipped, setFlipped] = useState(false);
  const { messageId } = useParams();

  const [postcard, setPostcard] = useState(null);

  useEffect(() => {
    const fetchPostcard = async () => {
      const data = await getSentPostcardDetail(messageId);
      setPostcard(data);
    };

    fetchPostcard();
  }, [messageId]);

  if (!postcard) return <div>엽서를 불러오는 중입니다...</div>;

  const { imageUrl, content, nfcName, font, replyText } = postcard;

  return (
    <StPageWrapper>
      <Header headerName="엽서상세" />

      <StFlipContainer onClick={() => setFlipped((prev) => !prev)}>
        <StFlipCard $flipped={flipped}>
          <StCardFace className="front">
            <StPostcardWhite />
            <StPostcardImage>
              <img src={imageUrl || DummyImg} alt="엽서사진" />
            </StPostcardImage>
          </StCardFace>
          <StCardFace className="back">
            <StPostcard src={PostcardImg} alt="엽서" />
            <StPostcardContent>
              <StPostcardStamp src={StampImg} alt="우표" />
              <StPostcardTitle $font={getFontStyle(font)}>
                사랑하는 {nfcName || '너'}에게,
              </StPostcardTitle>
              <StPostcardText $font={getFontStyle(font)}>{content}</StPostcardText>
            </StPostcardContent>
          </StCardFace>
        </StFlipCard>
      </StFlipContainer>

      <ReplyComponent
        messageId={messageId}
        replyText={replyText}
        dearName={nfcName}
        isSender={true}
      />
    </StPageWrapper>
  );
};

export default PostcardDetail;

const StPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StFlipContainer = styled.div`
  perspective: 100rem;
  width: 30rem;
  height: 23rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7rem;
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
  top: 2rem;
  right: 2rem;
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
  top: 0.9rem;
  left: 0.8rem;
  width: 28.3rem;
  height: 21rem;
  z-index: 3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
