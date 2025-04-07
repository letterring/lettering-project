import React from 'react';

import { IcKakaoLogo } from '../../../assets/icons';
import LongButton from '../../common/button/LongButton';

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=profile_nickname,account_email`;
  };

  return (
    <LongButton
      btnName={
        <>
          <IcKakaoLogo style={{ marginRight: '1rem' }} /> 카카오 로그인
        </>
      }
      onClick={handleKakaoLogin}
      variant="kakao"
    />
  );
};

export default KakaoLoginButton;
