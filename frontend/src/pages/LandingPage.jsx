import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserData } from '../apis/users';
import Login from '../components/Login';

const LandingPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //로그인 상태 확인 및 자동 리다이렉트
  useEffect(() => {
    if (document.cookie.includes('JSESSIONID')) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserData = async () => {
    const data = await getUserData();

    setUser(data);
    // 로그인 상태인 경우 홈으로 이동
    navigate('/home');
  };

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    !user && (
      <>
        <Login onLoginSuccess={fetchUserData} />
      </>
    )
  );
};

export default LandingPage;
