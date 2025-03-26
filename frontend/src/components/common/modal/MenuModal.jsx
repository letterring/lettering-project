import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const MenuModal = ({ isShowing, status, target }) => {
  const navigate = useNavigate();

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

  const handleClickMenu = (name) => {
    // console.log(name);
    navigate(`/${name}`);
  };

  return (
    isShowing && (
      <StMenuModalWrapper>
        {menus.map((item, id) => (
          <StMenu
            key={id}
            onClick={() => handleClickMenu(item.id)}
            $status={status === item.name}
            $item={item.id}
          >
            {item.name}
          </StMenu>
        ))}
      </StMenuModalWrapper>
    )
  );
};

export default MenuModal;

const StMenuModalWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 12rem;
  height: 100%;

  padding-top: 5rem;
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
`;
