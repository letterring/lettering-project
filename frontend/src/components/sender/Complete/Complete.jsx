import React from 'react';
import styled from 'styled-components';

import CompleteImg from '../../../assets/images/sender/TransmissionComplete.png';

const CompletePage = () => {
  return (
    <Wrapper>
      <Image src={CompleteImg} alt="전송 완료 이미지" />
      <Title>전송 완료!!</Title>
      <SubText>키링을 태그하면 도착한 편지를 바로 확인할 수 있어요!</SubText>
    </Wrapper>
  );
};

export default CompletePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.Background};
  padding: 2rem;
  text-align: center;
`;

const Image = styled.img`
  width: 18rem;
  height: auto;
  margin-bottom: 3rem;
`;

const Title = styled.div`
  ${({ theme }) => theme.fonts.Saeum3};
  color: ${({ theme }) => theme.colors.Gray1};
  margin-bottom: 1rem;
`;

const SubText = styled.div`
  ${({ theme }) => theme.fonts.Body3};
  color: ${({ theme }) => theme.colors.Gray3};
`;
