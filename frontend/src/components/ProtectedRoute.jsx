import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ 로딩 상태 추가

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        navigate('/'); // ✅ 로그인 안 된 경우 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('세션 조회 실패', error);
      navigate('/');
    } finally {
      setIsLoading(false); // ✅ 로딩 종료
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/logout', {
        method: 'POST',
        mode: 'cors', // ✅ CORS 모드 명시적으로 추가
        credentials: 'include', // ✅ 세션 쿠키 포함
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('✅ 로그아웃 성공');
        setUser(null); // ✅ 상태 업데이트
        document.cookie = 'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
      } else {
        console.error('❌ 로그아웃 실패', response.status);
      }
    } catch (error) {
      console.error('🚨 로그아웃 요청 실패', error);
    }
  };

  return isLoading ? <p>로딩 중...</p> : user ? <Home user={user} onLogout={handleLogout} /> : null;
};

export default ProtectedRoute;
