import React from 'react';
import styled from 'styled-components';

import InfoBox from './InfoBox';
import KeyringCard from './KeyringCard';
import ProgressBar from './ProgressBar';

const My = () => {
  return (
    <StMypageWrapper>
      <InfoBox title="닉네임" type="nickname" value="NaNa" />
      <InfoBox title="폰트" type="font" value="GangwonEduAll" />
      <InfoBox title="키링" type="keyringList" value={KeyringCard} />
      <ProgressBar />
    </StMypageWrapper>
  );
};

export default My;

const StMypageWrapper = styled.div`
  width: 23.4375rem;
  height: 50.75rem;
  border: 1px solid ${({ theme }) => theme.colors.MainRed};
  display: flex;
  flex-direction: column;
  padding: 8.75rem 2.25rem 3rem 2.31rem;
  background-color: #f9f9f9;
`;
