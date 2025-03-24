import React from 'react';
import styled from 'styled-components';

import { IcArrowRight, IcPen, IcSetting } from '../../../assets/icons';
import KeyringCard from './KeyringCard';

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
  return <KeyringCard />;
};

export default SettingItem;

const StBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 18.875rem;
  height: 2.4375rem;
  padding: 0.75rem 2.25rem 0.75rem 1rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.White};
`;
