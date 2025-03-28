import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import EndTemplate from './EndTemplate';
import FilmTemplate from './FilmTemplate';
import GridTemplate from './GridTemplate';
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
            <StLetterText>{text[0]}</StLetterText>
          </>
        )}
        {template === 'film' && (
          <>
            <StLetterText>{text[0]}</StLetterText>
            <FilmTemplate images={images} />
          </>
        )}
        {template === 'polar' && (
          <>
            <PolarTemplate images={images} />
            <StLetterText>{text[0]}</StLetterText>
          </>
        )}
        {template === 'card' && (
          <>
            <StLetterText>{text[0]}</StLetterText>
            <GridTemplate images={images} />
            <StLetterText>{text[1]}</StLetterText>
          </>
        )}
        {template === 'answer' && (
          <>
            <StLetterText>
              {text[0]}
              <br /> {text[1]}
            </StLetterText>
            <EndTemplate images={images} />
            <ReplyComponent />
          </>
        )}
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
  min-height: 4rem;

  ${({ theme }) => theme.fonts.Gomsin2};
  word-wrap: break-word;
  overflow: auto;
  white-space: normal;
`;
