import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Background from '/src/assets/background2.png';
import SendermainImg from '/src/assets/images/sender_main.png';

import { getKeyringList } from '../../../apis/keyring';
import { IcMenu } from '../../../assets/icons';
import CoinBirdImg from '../../../assets/images/bird_coin.png';
import useModal from '../../../hooks/common/useModal';
import ConfirmButton from '../../common/button/ConfirmButton';
import LongButton from '../../common/button/LongButton';
import AlertModal from '../../common/modal/AlertModal';
import MenuModal from '../../common/modal/MenuModal';

const Home = () => {
  const menu = useModal();
  const navigate = useNavigate();
  const alarm = useModal();

  const handleMenuClick = async () => {
    menu.toggle();
  };

  const handleAuth = async () => {
    const res = await getKeyringList();

    if (!res || res.length == 0) {
      alarm.setShowing(true);
    } else {
      navigate(`/theme`);
    }
  };

  return (
    <>
      <StHomeWrapper $Background={Background}>
        <MenuBtn onClick={handleMenuClick} />
        <StContentWrapper>
          Lettering
          <img src={SendermainImg} alt="senderMainImg" />
          <StButtonsWrapper>
            <LongButton btnName="편지 쓰기" onClick={handleAuth} />
            <LongButton
              btnName="보낸 편지함"
              onClick={() => {
                navigate(`/mailbox`);
              }}
            />
          </StButtonsWrapper>
        </StContentWrapper>
      </StHomeWrapper>

      <StMenuModalWrapper $showing={menu.isShowing} onClick={menu.toggle}>
        <MenuModal isShowing={menu.isShowing} target="sender" />
      </StMenuModalWrapper>

      <AlertModal
        title="키링을 구매한 뒤 편지를 써주세요."
        imgSrc={CoinBirdImg}
        isOpen={alarm.isShowing}
        onClose={alarm.toggle}
      >
        <ConfirmButton onClick={() => navigate(`/purchase`)} btnName="키링 구매하러 가기" />
      </AlertModal>
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
  top: 3rem;
  right: 3rem;

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

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;
