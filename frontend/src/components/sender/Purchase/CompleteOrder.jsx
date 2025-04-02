import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getKeyringData } from '../../../apis/keyring';
import PresentImg from '../../../assets/images/present.png';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';

const CompleteOrder = () => {
  const navigate = useNavigate();

  return (
    <>
      <StWrapper>
        <Header headerName="주문 완료" />
        <StContent>
          <StText>
            <h3>주문이 완료되었어요</h3>
            <p>주문번호: 1234567</p>
          </StText>
          <ImageWrapper>
            <img src={PresentImg} alt="키링 이미지" />
          </ImageWrapper>
          <LongButton
            btnName="편지 쓰러가기"
            onClick={() => {
              navigate(`/theme`);
            }}
          />
        </StContent>
      </StWrapper>
    </>
  );
};

export default CompleteOrder;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
  height: 100%;
`;

const StContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  padding: 4rem 2rem;
  padding-top: 7rem;

  height: 100%;
`;

const StText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.5rem;

  padding: 2rem 0;

  h3 {
    ${({ theme }) => theme.fonts.Title1};
    color: ${({ theme }) => theme.colors.Gray0};
  }

  p {
    ${({ theme }) => theme.fonts.Title4};
    color: ${({ theme }) => theme.colors.Gray2};
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;

  img {
    width: 100%;
  }
`;
