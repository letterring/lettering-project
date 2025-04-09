import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LongButton from '/src/components/common/button/LongButton';
import Header from '/src/components/common/Header';

import { terminateKeyring } from '../../../apis/dear';

const Terminate = () => {
  const navigate = useNavigate();

  const handleTerminate = async () => {
    await terminateKeyring();
    navigate('/');
  };

  return (
    <StTerminateWrapper>
      <Header headerName="Lettering" />
      <StBodyWrapper>
        <StText>
          <h3>정말 이 키링과 작별하시겠어요?</h3>
          <p>키링이 삭제되면 편지를 주고받았던 기억도 함께 사라집니다.</p>
          <p>이 선택은 되돌릴 수 없어요.</p>
        </StText>
        <LongButton
          btnName="그대로 간직할래요"
          variant="cancel"
          onClick={() => navigate('/dear/home')}
        />
        <LongButton btnName="네, 삭제할게요" onClick={handleTerminate} />
      </StBodyWrapper>
    </StTerminateWrapper>
  );
};

export default Terminate;

const StTerminateWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 10rem 3rem;
`;

const StText = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    ${({ theme }) => theme.fonts.Title2};
    color: ${({ theme }) => theme.colors.MainRed};
    margin-bottom: 1.2rem;
  }

  p {
    ${({ theme }) => theme.fonts.Body4};
    color: ${({ theme }) => theme.colors.Gray2};
    line-height: 100%;
    margin-bottom: 0.8rem;
  }
`;
