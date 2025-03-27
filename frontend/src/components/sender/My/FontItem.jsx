import React from 'react';
import styled from 'styled-components';

import { IcCheckCircle } from '../../../assets/icons';

const FontItem = ({ fontName, isSelected, onClick, onConfirm }) => {
  return (
    <StFontBox $isSelected={isSelected} onClick={onClick}>
      {fontName}
      {isSelected && (
        <IcCheckCircle
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            onConfirm();
          }}
        />
      )}
    </StFontBox>
  );
};

export default FontItem;

const StFontBox = styled.div`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Saeum3};
  background-color: ${({ theme }) => theme.colors.White};
  width: 100%;
  height: 4rem;
  border-radius: 1rem;
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;

  border: ${({ $isSelected, theme }) =>
    $isSelected ? `1.5px solid ${theme.colors.Red1}` : 'none'};
`;
