import React from 'react';
import styled from 'styled-components';

import { IcSetting } from '../../../assets/icons';
import SettingItem from './SettingItem';

const InfoBox = ({ title, type, value }) => {
  return (
    <>
      <StTitleWrapper>
        {title}
        {type === 'keyringList' && <IcSetting />}
      </StTitleWrapper>
      <SettingItem type={type} value={value} />
    </>
  );
};

export default InfoBox;

const StTitleWrapper = styled.div`
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Title2};
  display: flex;
  justify-content: space-between;
  width: 18.875rem;
`;
