import React from 'react';
import { useEffect } from 'react';

const OpenAppPage = () => {
  useEffect(() => {
    window.location.href = 'myapp://dear';

    const timer = setTimeout(() => {
      window.location.href = 'https://letterring.shop/dear';
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p>
        앱을 여는 중입니다... 자동으로 열리지 않으면{' '}
        <a href="https://letterring.shop/dear">여기를 눌러주세요</a>
      </p>
    </div>
  );
};

export default OpenAppPage;
