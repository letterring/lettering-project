import React from 'react';
import styled from 'styled-components';

import KakaoLoginButtonImg from '../../assets/images/kakao_login_button.png';

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=profile_nickname,account_email`;
  };

  return (
    <StBtnWrapper onClick={handleKakaoLogin}>
      <img src={KakaoLoginButtonImg} alt="카카오 로그인 버튼" />
    </StBtnWrapper>
  );
};

export default KakaoLoginButton;

const StBtnWrapper = styled.button`
  width: 100%;

  margin: 1rem 0;

  border: none;
  border-radius: 0.5rem;
  box-sizing: border-box;

  background-color: #fee500;
  color: black;
  font-weight: bold;
`;
