import React from 'react';
import styled from 'styled-components';

import Header from '../../common/Header';
import CenterCarousel from './CenterCarousel';

const DearMailBox = () => {
  return (
    <>
      <StListWrapper>
        <Header headerName="받은 편지함" />
        <StContentWrapper>
          <CenterCarousel />
        </StContentWrapper>
      </StListWrapper>
    </>
  );
};

export default DearMailBox;

const StListWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  height: 100%;
  padding: 0 2rem;
  padding-right: 0;
  padding-top: 7rem;

  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.TitleLogo};

  overflow: hidden;

  img {
    width: 100%;
  }
`;
