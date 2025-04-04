import React, { useState } from 'react';
import styled from 'styled-components';

import { IcSend } from '/src/assets/icons';

import { sendReply } from '../../../apis/reply';

const ReplyComponent = ({ messageId, replyText, dearName, isSender }) => {
  const [reply, setReply] = useState(replyText || '');
  const [isSent, setIsSent] = useState(!!replyText);
  const isEditable = !isSender || isSent;

  const handleReplyChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setReply(value);
    }
  };

  const handleSendClick = async () => {
    await sendReply(messageId, reply);

    setIsSent(true);
  };

  return (
    <StReplyWrapper>
      <StReplyHeader>
        <StReplyTitle>{dearName} 의 답장</StReplyTitle>
        {isEditable && !isSent && (
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
              readOnly={!isEditable}
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
  position: relative;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StReplyHeader = styled.div`
  width: 25rem;
  box-sizing: border-box;
  margin: 0rem;

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
  width: 100%;

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
    opacity: ${({ readOnly }) => (readOnly ? 1 : 0)};
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
