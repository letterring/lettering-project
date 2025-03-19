import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (!code) {
        console.error('카카오 로그인 코드가 없습니다.');
        return;
      }

      try {
        const res = await axios.post(KAKAO_REDIRECT_URI, new URLSearchParams({ code }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          withCredentials: true,
        });

        if (!response.data) {
          throw new Error('카카오 로그인 실패');
        }

        alert(`카카오 로그인 성공! 환영합니다, ${res.userNickname}님.`);
        navigate('/home');
      } catch (err) {
        console.error('카카오 로그인 오류:', err);
      }
    };

    handleKakaoLogin();
  }, []);

  return <p>카카오 로그인 중...</p>;
};

export default KakaoCallback;
