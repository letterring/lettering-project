import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { getKeyringList } from '../../../apis/keyring';
import { logout } from '../../../apis/user';
import CoinBirdImg from '../../../assets/images/bird_coin.png';
import useModal from '../../../hooks/common/useModal';
import ConfirmButton from '../button/ConfirmButton';
import AlertModal from './AlertModal';

const MenuModal = ({ isShowing, target }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const alarm = useModal();

  //status: 현재 선택된 메뉴명
  const senderMenus = [
    { id: 'home', name: '시작 화면' },
    { id: 'theme', name: '편지 쓰기' },
    { id: 'mailbox', name: '보낸 편지함' },
    { id: 'purchase', name: '키링 구매' },
    { id: 'mypage', name: '마이페이지' },
    { id: 'logout', name: '로그아웃' },
  ];

  const dearMenus = [
    { id: 'home', name: '시작 화면' },
    { id: 'mailbox', name: '받은 편지함' },
    { id: 'logout', name: '키링 연결끊기' },
  ];

  const menus = target === 'sender' ? senderMenus : dearMenus;

  const handleStatus = (id) => {
    const writingPaths = [
      '/theme',
      '/selectdear',
      '/deliverytype',
      '/writing',
      '/postcard',
      '/letter',
    ];
    if (id === 'theme') {
      return writingPaths.some((path) => location.pathname.includes(path));
    }
    return location.pathname.includes(id);
  };

  const handleClickMenu = (name) => {
    if (name === 'logout') {
      logout();
      navigate('/');
    } else if (name === 'theme') {
      handleAuth();
    } else {
      if (target === 'sender') {
        navigate(`/${name}`);
      } else {
        navigate(`/dear/${name}`);
      }
    }
  };

  const handleAuth = async () => {
    const res = await getKeyringList();
    console.log(res);

    if (!res || res.length == 0) {
      alarm.setShowing(true);
    } else {
      navigate(`/theme`);
    }
  };

  return (
    isShowing && (
      <>
        <StMenuModalWrapper>
          {menus.map((item, id) => (
            <StMenu
              key={id}
              onClick={() => handleClickMenu(item.id)}
              $status={handleStatus(item.id)}
              $item={item.id}
            >
              {item.name}
            </StMenu>
          ))}
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
    )
  );
};

export default MenuModal;

const StMenuModalWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 12rem;
  height: 100vh;

  padding-top: 5rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.Background};
  z-index: 1000;
`;

const StMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5rem;

  ${({ theme, $status }) => ($status ? theme.fonts.Title5 : theme.fonts.Body2)};
  color: ${({ theme, $item }) => ($item === 'logout' ? theme.colors.MainRed : theme.colors.Gray0)};
  background-color: ${({ theme, $status }) =>
    $status ? theme.colors.White : theme.colors.Background};

  cursor: pointer;
`;
