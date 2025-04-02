import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getUserFont } from '/src/apis/user';
import { getFontStyle } from '/src/util/getFont';

const MAX_LENGTH = 150;

const TextAreaEditor = ({ value = '', onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState(value);
  const [userFont, setUserFont] = useState(undefined);

  useEffect(() => {
    const fetchFont = async () => {
      const { font } = await getUserFont();
      setUserFont(getFontStyle(font));
    };

    fetchFont();
  }, []);

  useEffect(() => {
    setTempText(value);
  }, [value]);

  const handleInput = (e) => {
    setTempText(e.target.value.slice(0, MAX_LENGTH));
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      onChange(tempText);
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <StLetterTextWrapper>
      <LetterText
        value={tempText}
        onChange={handleInput}
        readOnly={!isEditing}
        maxLength={MAX_LENGTH}
        $fonStyle={userFont}
      />
      <CharCount>{`${value.length}/${MAX_LENGTH}`}</CharCount>
      <EditButton onClick={handleToggleEdit} $isEditing={isEditing}>
        {isEditing ? '완료' : '수정'}
      </EditButton>
    </StLetterTextWrapper>
  );
};

export default TextAreaEditor;

const StLetterTextWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 22rem;
  height: 15rem;
  box-sizing: border-box;
`;

const LetterText = styled.textarea`
  width: 22rem;
  height: 12rem;

  word-wrap: break-word;
  overflow: auto;
  white-space: normal;

  ${({ theme, $fonStyle }) => theme.fonts[$fonStyle]}
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
