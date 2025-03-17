// 페이지명도 대문자 카멜케이스 적용

import React from 'react';
import styled from 'styled-components';

const ErrorPage = () => {
  return (
    <ErrorWrapper>
      <h1>4😭4 Error</h1>
      <h3>앗! 페이지가 없어요 ㅠㅠㅠ</h3>
      <p>
        요청하신 페이지가 존재하지 않거나, <br />
        이름이 변경되었거나, <br />
        일시적으로 사용이 중단되었어요.
      </p>
    </ErrorWrapper>
  );
};

export default ErrorPage;

const ErrorWrapper = styled.div`
  h1 {
    color: #bf2e21;
  }
`;
