import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import LongButton from '../../common/button/LongButton';
import EndTemplateEditor from './EndTemplateEditor';
import FilmTemplateEditor from './FilmTemplateEditor';
import GridTemplateEditor from './GridTemplateEditor';
import MainTemplateEditor from './MainTemplateEditor';
import PolarTemplateEditor from './PolarTemplateEditor';
import TextAreaEditor from './TextAreaEditor';

const LetterEditor = ({
  template,
  images,
  background,
  textList,
  textStartIndex = 0,
  onTextChange,
  font,
}) => {
  const renderTextArea = (index) => {
    const globalIndex = textStartIndex + index;
    const value = textList?.[globalIndex] || '';

    return (
      <TextAreaEditor
        key={index}
        value={value}
        onChange={(newValue) => onTextChange(globalIndex, newValue)}
        font={font}
      />
    );
  };

  return (
    <StLetterWrapper $background={background}>
      <StContentWrapper>
        {template === 'main' && (
          <>
            <MainTemplateEditor images={images} />
            {renderTextArea(0)}
          </>
        )}
        {template === 'film' && (
          <>
            {renderTextArea(0)}
            <FilmTemplateEditor images={images} />
          </>
        )}
        {template === 'polar' && (
          <>
            <PolarTemplateEditor images={images} />
            {renderTextArea(0)}
          </>
        )}
        {template === 'card' && (
          <>
            {renderTextArea(0)}
            <GridTemplateEditor images={images} />
            {renderTextArea(1)}
          </>
        )}
        {template === 'end' && (
          <>
            <StEndText>편지 작성을 다 완료하셨나요?</StEndText>
            <StEndText>한번 보낸 편지는 수정할 수 없어요</StEndText>
            <EndTemplateEditor images={images} />
            <LongButton btnName="편지 전송하기" />
          </>
        )}
      </StContentWrapper>
    </StLetterWrapper>
  );
};

export default LetterEditor;

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

const StLetterTextWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22rem;
  height: 15rem;
  display: flex;
  box-sizing: border-box;
`;

const LetterText = styled.textarea`
  width: 22rem;
  height: 12rem;

  word-wrap: break-word;
  overflow: auto;
  white-space: normal;

  ${({ theme }) => theme.fonts.Gomsin2};
  background-color: transparent;
  border: solid ${({ theme }) => theme.colors.Orange1};
  border-radius: 0.75rem;
  outline: none;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0.5rem;
  width: 4rem;
  height: 2rem;
  background-color: ${({ theme, $isEditing }) =>
    $isEditing ? theme.colors.MainRed : theme.colors.Orange1};
  border-radius: 1rem;
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.White};
`;

const CharCount = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  color: ${({ theme }) => theme.colors.Orange1};
  ${({ theme }) => theme.fonts.Body4};
`;

const StEndText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.fonts.Gomsin2};
`;
