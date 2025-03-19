import React from 'react';
import styled from 'styled-components';

import { logout } from '../../../apis/users';
import OBJViewer from '../../OBJViewer';

const Home = ({ user }) => {
  const handleLogout = async () => {
    const res = await logout();

    if (res.ok) {
      console.log('로그아웃 성공');
      setUser(null);
      document.cookie = 'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/';
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#F4F1E9' }}>
      <OBJViewer objPath="/models/postbox.obj" mtlPath="/models/postbox.mtl" />
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        {user ? (
          <>
            <h3>환영합니다, {user.userNickname}님!</h3>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Home;

const LogoutBtn = styled.button`
  padding: 1rem;
  margin-top: 1rem;

  border-radius: 0.5rem;
  border: none;

  background-color: #ff4d4d;
  color: white;
`;
