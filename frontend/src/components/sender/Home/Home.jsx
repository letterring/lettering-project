// 컴포넌트 명은 무조건 대문자 카멜케이스 적용
import React from 'react';
import styled from 'styled-components';

import Background from '/src/assets/background2.png';
import SendermainImg from '/src/assets/images/sender_main.png';

import { IcMenu } from '../../../assets/icons';
import useModal from '../../../hooks/common/useModal';
import LongButton from '../../common/button/LongButton';
import MenuModal from '../../common/modal/MenuModal';

const Home = () => {
  const menu = useModal();

  const handleMenuClick = () => {
    menu.toggle();
  };

  return (
    <>
      <StHomeWrapper $Background={Background}>
        <MenuBtn onClick={handleMenuClick} />
        <StContentWrapper>
          Lettering
          <img src={SendermainImg} alt="senderMainImg" />
          <StButtonsWrapper>
            <LongButton btnName="편지 쓰기" />
            <LongButton btnName="보낸 편지함" />
          </StButtonsWrapper>
        </StContentWrapper>
      </StHomeWrapper>

      <StMenuModalWrapper $showing={menu.isShowing} onClick={menu.toggle}>
        <MenuModal isShowing={menu.isShowing} status="시작 화면" />
      </StMenuModalWrapper>
    </>
  );
};

export default Home;

const StHomeWrapper = styled.div`
  position: relative;
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
  position: absolute;
  top: 4rem;
  right: 2rem;

  cursor: pointer;
`;

const StMenuModalWrapper = styled.div`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
