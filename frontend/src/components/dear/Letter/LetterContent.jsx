import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import CardTemplate from './CardTemplate';
import FilmTemplate from './FilmTemplate';
import MainTemplate from './MainTemplate';
import PolarTemplate from './PolarTemplate';
import ReplyComponent from './ReplyComponent';

const LetterContent = ({ template, images, text, background }) => {
  return (
    <StLetterWrapper $background={background}>
      <StContentWrapper>
        {template === 'main' && (
          <>
            <MainTemplate images={images} />
            <StLetterText>{text}</StLetterText>
          </>
        )}
        {template === 'film' && (
          <>
            <StLetterText>{text}</StLetterText>
            <FilmTemplate images={images} />
          </>
        )}
        {template === 'polar' && (
          <>
            <PolarTemplate images={images} />
            <StLetterText>{text}</StLetterText>
          </>
        )}
        {template === 'card' && (
          <>
            <StLetterText>{text}</StLetterText>
            <CardTemplate images={images} />
          </>
        )}
        {template === 'answer' && <ReplyComponent />}
      </StContentWrapper>
    </StLetterWrapper>
  );
};

export default LetterContent;

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

const StLetterText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;

  ${({ theme }) => theme.fonts.Gomsin2};
  word-wrap: break-word;
  overflow: auto;
  white-space: normal;
`;
