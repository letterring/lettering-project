// 컴포넌트 명은 무조건 대문자 카멜케이스 적용
import React from 'react';
import styled from 'styled-components';

import Background from '/src/assets/background2.png';
import SendermainImg from '/src/assets/images/sender_main.png';

import { IcMenu } from '../../../assets/icons';
import LongButton from '../../common/button/LongButton';

const Home = () => {
  return (
    <>
      <StHomeWrapper Background={Background}>
        <MenuBtn />
        <StContentWrapper>
          Lettering
          <img src={SendermainImg} alt="senderMainImg" />
          <StButtonsWrapper>
            <LongButton btnName="편지 쓰기" />
            <LongButton btnName="보낸 편지함" />
          </StButtonsWrapper>
        </StContentWrapper>
      </StHomeWrapper>
    </>
  );
};

export default Home;

const StHomeWrapper = styled.div`
  height: 100%;

  background-image: url(${Background});
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  padding: 4rem;
  padding-top: 6rem;
  box-sizing: border-box;
  height: 100%;

  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.TitleLogo};

  img {
    width: 100%;
  }
`;

const StButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
`;

const MenuBtn = styled(IcMenu)`
  position: fixed;
  top: 4rem;
  right: 2rem;

  cursor: pointer;
`;
