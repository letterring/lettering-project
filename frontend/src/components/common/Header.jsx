import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { IcBack, IcMenuSmall } from '../../assets/icons';
import useModal from '../../hooks/common/useModal';
import MenuModal from './modal/MenuModal';

const Header = ({ headerName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menu = useModal();

  const target = location.pathname.includes('/dear') ? 'dear' : 'sender';

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMenuClick = () => {
    menu.toggle();
  };

  return (
    <>
      <StHeaderWrapper>
        <IcBack onClick={handleGoBack} />
        {headerName}
        <IcMenuSmall onClick={handleMenuClick} />
      </StHeaderWrapper>

      <StMenuModalWrapper $showing={menu.isShowing} onClick={menu.toggle}>
        <MenuModal isShowing={menu.isShowing} target={target} />
      </StMenuModalWrapper>
    </>
  );
};

export default Header;

const StHeaderWrapper = styled.button`
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2rem;

  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.MenuLogo};
`;

const StMenuModalWrapper = styled.div`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
