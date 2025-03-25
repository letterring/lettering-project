import React from 'react';
import styled from 'styled-components';

const SettingItem = ({ value, icon: IconComponent, onIconClick }) => {
  return (
    <StBoxWrapper>
      {value}
      {IconComponent && <IconComponent style={{ cursor: 'pointer' }} onClick={onIconClick} />}
    </StBoxWrapper>
  );
};

export default SettingItem;

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
`;
