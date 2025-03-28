import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const NickNameSetting = ({ value, icon: IconComponent, onIconClick, isEditing, onStartEdit }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <StBoxWrapper $isEditing={isEditing}>
      {isEditing ? (
        <StyledInput value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      ) : (
        <StyledText>{value}</StyledText>
      )}
      {IconComponent && (
        <IconComponent
          style={{ cursor: 'pointer' }}
          onClick={() => {
            isEditing ? onIconClick(inputValue) : onStartEdit();
          }}
        />
      )}
    </StBoxWrapper>
  );
};

export default NickNameSetting;

const StBoxWrapper = styled.div`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Saeum3};
  background-color: ${({ theme }) => theme.colors.White};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 1rem 3rem 0.75rem 3rem;
  border-radius: 1rem;
  box-sizing: border-box;
  border: ${({ $isEditing, theme }) => ($isEditing ? `1.5px solid ${theme.colors.Red1}` : 'none')};
`;

const StyledInput = styled.input`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Saeum3};
  background-color: ${({ theme }) => theme.colors.White};
  outline: none;
  background: transparent;
  font: inherit;
  width: 100%;
  border: none;
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Saeum3};
  width: 100%;
`;
