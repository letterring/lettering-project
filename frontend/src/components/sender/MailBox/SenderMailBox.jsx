// 컴포넌트 명은 무조건 대문자 카멜케이스 적용
import React from 'react';
import styled from 'styled-components';

import Header from '../../common/Header';
import CenterCarousel from './CenterCarousel';

const SenderMailBox = () => {
  return (
    <>
      <StListWrapper>
        <Header headerName="보낸 편지함" />
        <StContentWrapper>
          <CenterCarousel />
        </StContentWrapper>
      </StListWrapper>
    </>
  );
};

export default SenderMailBox;

const StListWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  height: 100%;
  padding-right: 4rem;
  padding-top: 7rem;

  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.TitleLogo};

  overflow: hidden;

  img {
    width: 100%;
  }
`;
