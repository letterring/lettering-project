import React from 'react';
import styled from 'styled-components';

import { IcArrowRight, IcPen } from '../../../assets/icons';

const SettingItem = ({ type, value }) => {
  if (type === 'nickname') {
    return (
      <StBoxWrapper>
        {value}
        <IcPen />
      </StBoxWrapper>
    );
  } else if (type === 'font') {
    return (
      <StBoxWrapper>
        {value}
        <IcArrowRight />
      </StBoxWrapper>
    );
  }
  return value;
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
  width: 18.875rem;
  height: 2.4375rem;
  padding: 0.75rem 2.25rem 0.75rem 1rem;
  margin-bottom: 2rem;
  border-radius: 1rem;
`;
