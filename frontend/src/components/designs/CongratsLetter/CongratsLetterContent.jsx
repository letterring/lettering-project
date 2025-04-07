import React from 'react';
import styled from 'styled-components';

import { getFontStyle } from '/src/util/getFont';

import ReplyComponent from '../ReplyComponent';
import EndTemplate from './EndTemplate';
import MainTemplate from './MainTemplate';
import SecondTemplate from './SecondTemplate';

const CongratsLetterContent = ({
  template,
  images,
  text,
  background,
  isActive,
  font,
  senderName,
  dearName,
  messageId,
  replyText,
  isSender,
}) => {
  const fontStyle = getFontStyle(font);
  return (
    <StLetterWrapper $background={background}>
      <StContentWrapper>
        {template === 'main' && (
          <>
            <MainTemplate images={images} />
            <StDearText $userFont={fontStyle}>{dearName} 에게</StDearText>
            <StLetterText $userFont={fontStyle}>{text[0]}</StLetterText>
          </>
        )}
        {template === 'second' && (
          <>
            <SecondTemplate images={images} />
            <StLetterText $userFont={fontStyle}>{text[0]}</StLetterText>
            <StSenderText $userFont={fontStyle}>{senderName} 로부터</StSenderText>
          </>
        )}

        {template === 'answer' && (
          <>
            <StLetterText $userFont={fontStyle}>
              {text[0]}
              <br /> {text[1]}
            </StLetterText>
            <EndTemplate images={images} />
            <ReplyComponent
              messageId={messageId}
              replyText={replyText}
              dearName={dearName}
              isSender={isSender}
            />
          </>
        )}
      </StContentWrapper>
    </StLetterWrapper>
  );
};

export default CongratsLetterContent;

const StLetterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 33rem;
  height: 55rem;

  background-image: url(${(props) => props.$background});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
`;

const StDearText = styled.div`
  ${({ $userFont, theme }) => theme.fonts[$userFont]};
  color: ${({ theme }) => theme.colors.Gray1};
  word-wrap: break-word;
  white-space: normal;
  overflow: auto;
  text-align: left;

  width: 100%;
  box-sizing: border-box;
  margin: 0.5rem 1rem;
`;

const StSenderText = styled.div`
  ${({ $userFont, theme }) => theme.fonts[$userFont]};
  color: ${({ theme }) => theme.colors.Gray1};
  word-wrap: break-word;
  white-space: normal;
  overflow: auto;
  text-align: right;

  width: 100%;
  box-sizing: border-box;
  margin: 0.5rem 1rem;
`;

const StLetterText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  box-sizing: border-box;
  margin: 0rem 1rem;
  min-height: 4rem;

  ${({ $userFont, theme }) => theme.fonts[$userFont]};
  color: ${({ theme }) => theme.colors.Gray2};
  word-wrap: break-word;
  overflow: auto;
  white-space: normal;
`;
