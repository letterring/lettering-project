import React from 'react';
import styled from 'styled-components';

import { IcCheckCircle } from '../../../../assets/icons';
import { getFontName, getFontStyle } from '../../../../util/getFont';

const FontItem = ({ fontEnum, isSelected, onClick, onConfirm }) => {
  const fontName = getFontName(fontEnum);
  const fontStyle = getFontStyle(fontEnum);

  return (
    <StFontBox $isSelected={isSelected} onClick={onClick} $fontKey={fontStyle}>
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
  ${({ theme, $fontKey }) => theme.fonts[$fontKey]};
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
