import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LongButton from '../../common/button/LongButton';
import EndTemplateEditor from './EndTemplateEditor';
import MainTemplateEditor from './MainTemplateEditor';
import SecondTemplateEditor from './SecondTemplateEditor';
import TextAreaEditor from './TextAreaEditor';

const LetterEditor = ({
  template,
  images,
  background,
  textList,
  textStartIndex = 0,
  onTextChange,
  font,
  onImageSet,
}) => {
  const navigate = useNavigate();
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
            <MainTemplateEditor images={images} onImageSet={onImageSet} />
            {renderTextArea(0)}
          </>
        )}
        {template === 'second' && (
          <>
            <SecondTemplateEditor images={images} onImageSet={onImageSet} />
            {renderTextArea(1)}
          </>
        )}
        {template === 'end' && (
          <>
            <StEndText>편지 작성을 다 완료하셨나요?</StEndText>
            <StEndText>한번 보낸 편지는 수정할 수 없어요</StEndText>
            <EndTemplateEditor images={images} />
            <LongButton onClick={() => navigate('/selectdear')} btnName="편지 전송하기" />
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

const StEndText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.fonts.Gomsin1};
`;
