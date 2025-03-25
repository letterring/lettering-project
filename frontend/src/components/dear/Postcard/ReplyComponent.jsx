import React, { useState } from 'react';
import styled from 'styled-components';

import { IcSend } from '../../../assets/icons';

const ReplyComponent = () => {
  const [reply, setReply] = useState(''); // 입력값 상태
  const [isSent, setIsSent] = useState(false); // 전송 여부 상태

  const handleReplyChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setReply(value);
    }
  };

  const handleSendClick = () => {
    console.log('답장 전송:', reply);
    setIsSent(true);
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
          <StInput
            type="text"
            value={reply}
            onChange={handleReplyChange}
            maxLength={50}
            placeholder="아직 답장하지 않았습니다"
          />
        ) : (
          <StSentReply>{reply}</StSentReply>
        )}
      </StReplyBox>
    </StReplyWrapper>
  );
};

export default ReplyComponent;

const StReplyWrapper = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 7rem;
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
  background-color: #f9e8e8;
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

const StInput = styled.input`
  ${({ theme }) => theme.fonts.Saeum5};
  text-align: center;

  width: 100%;
  padding: 1rem;

  background-color: #f9e8e8;
  border-radius: 0.8rem;
  border: none;
  outline: none;

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
  cursor: pointer;
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
  ${({ theme }) => theme.fonts.Saeum5};
  text-align: center;

  width: 100%;
  padding: 1rem;
`;
