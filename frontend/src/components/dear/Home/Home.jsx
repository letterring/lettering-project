// 컴포넌트 명은 무조건 대문자 카멜케이스 적용

import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <>
      <StHomeWrapper>Home</StHomeWrapper>
    </>
  );
};

export default Home;

const StHomeWrapper = styled.div`
  color: darkred;
`;
