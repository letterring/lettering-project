import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { replyToPostcard } from '/src/apis/postcard';

import { IcSend } from '../../../assets/icons';

const ReplyComponent = ({ messageId, replyText }) => {
  const [reply, setReply] = useState(''); // 입력값 상태
  const [isSent, setIsSent] = useState(false); // 전송 여부 상태
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (replyText) {
      setReply(replyText);
      setIsSent(true);
    }
  }, [replyText]);

  const handleReplyChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setReply(value);
    }
  };

  const handleSendClick = async () => {
    if (!reply) return;
    setIsLoading(true);

    try {
      await replyToPostcard(messageId, reply);
      setIsSent(true);
    } catch (error) {
      alert('답장 전송에 실패했어요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StReplyWrapper>
      <StReplyHeader>
        <StReplyTitle>내가 보낸 답장</StReplyTitle>
        {!isSent && (
          <StButton onClick={handleSendClick} disabled={reply.length === 0}>
            <IcSend width={22} height={21} />
          </StButton>
        )}
      </StReplyHeader>
      <StReplyBox>
        {!isSent ? (
          <>
            <StTextArea
              value={reply}
              onChange={handleReplyChange}
              maxLength={50}
              placeholder="아직 답장하지 않았습니다"
            />
            <StCharacterCount>{reply.length} / 50</StCharacterCount>
          </>
        ) : (
          <StSentReply>{reply}</StSentReply>
        )}
      </StReplyBox>
    </StReplyWrapper>
  );
};

export default ReplyComponent;

const StReplyWrapper = styled.div`
  /* position: absolute;
  bottom: 0; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  width: 25rem;
`;

const StReplyHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StReplyBox = styled.div`
  background-color: ${({ theme }) => theme.colors.Pink2};
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StReplyTitle = styled.div`
  ${({ theme }) => theme.fonts.EduTitle1};
  color: ${({ theme }) => theme.colors.MainRed};
`;

const StTextArea = styled.textarea`
  ${({ theme }) => theme.fonts.Saeum6};
  text-align: center;

  width: 100%;
  padding: 1rem;

  background-color: ${({ theme }) => theme.colors.Pink2};
  border-radius: 0.8rem;
  border: none;
  outline: none;
  resize: none;
  min-height: 5rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray0};
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

const StButton = styled.button`
  background-color: #fff;
  border: 0.12rem solid ${({ theme }) => theme.colors.MainRed};
  border-radius: 50%;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  box-sizing: border-box;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StSentReply = styled.p`
  ${({ theme }) => theme.fonts.Saeum6};
  text-align: center;

  width: 100%;
  padding: 1rem;
`;

const StCharacterCount = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.Gray0};
`;
