import React from 'react';
import styled from 'styled-components';

import { IcOpened, IcUnOpened } from '../../../assets/icons';
import Header from '../../common/Header';
import CenterCarousel from './CenterCarousel';

const DearMailBox = () => {
  return (
    <>
      <StListWrapper>
        <Header headerName="받은 편지함" />
        <StContentWrapper>
          <StatusWrapper>
            <ShowStatus className="unopened">
              <IcUnOpened />
              <p>1</p>
            </ShowStatus>
            <ShowStatus className="opened">
              <IcOpened />
              <p>15</p>
            </ShowStatus>
          </StatusWrapper>

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
  justify-content: flex-start;
  align-items: center;
  gap: 5rem;

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

const StatusWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 1rem 0;
  padding-right: 2rem;

  .opened {
    color: ${({ theme }) => theme.colors.Gray1};
  }
`;

const ShowStatus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  ${({ theme }) => theme.fonts.Title5};
`;
