import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { TotalPrice } from '../../../recoil/atom';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';

const Checkout = () => {
  const navigate = useNavigate();
  const price = useRecoilValue(TotalPrice);
  const handleCheckout = () => {
    navigate('/purchase/customize');
  };
  return (
    <StCheckoutWrapper>
      <Header headerName="주문/결제" />
      <StBodyWrapper>
        <TitleText>주문자 정보</TitleText>
        <BodyText>이름</BodyText>
        <ContentWrapper>
          <InputField />
        </ContentWrapper>
        <BodyText>번호</BodyText>
        <ContentWrapper>
          <InputField />
        </ContentWrapper>
        <TitleText>배송지 정보</TitleText>
        <BodyText>우편번호</BodyText>
        <ContentWrapper>
          <InputField />
          <ZipCodeButton>우편번호검색</ZipCodeButton>
        </ContentWrapper>
        <BodyText>기본주소</BodyText>
        <ContentWrapper>
          <InputField />
        </ContentWrapper>
        <BodyText>상세주소</BodyText>
        <ContentWrapper>
          <InputField />
        </ContentWrapper>
        <TitleText>결제수단</TitleText>
        <KaKaopayButton>카카오페이</KaKaopayButton>
        <TitleText>결제정보</TitleText>
        <BodyText>결제금액</BodyText>
        <ContentWrapper>
          <PriceText>{price}</PriceText>
        </ContentWrapper>
        <LongButton btnName="결제하기" onClick={handleCheckout} />
      </StBodyWrapper>
    </StCheckoutWrapper>
  );
};

export default Checkout;

const StCheckoutWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  margin: 7rem 3rem;
  padding-top: 1rem;
  box-sizing: border-box;
  gap: 1rem;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 28rem;
  height: 3rem;
`;

const InputField = styled.input`
  width: 28rem;
  height: 3rem;

  outline: none;

  background-color: transparent;
  border: solid ${({ theme }) => theme.colors.Gray5};
  border-radius: 0.625rem;
`;

const ZipCodeButton = styled.button`
  position: absolute;
  right: 0;

  width: 10rem;
  height: 3rem;
  border-radius: 0.625rem;

  background-color: ${({ theme }) => theme.colors.Red2};
  ${({ theme }) => theme.fonts.Title5}
  color: ${({ theme }) => theme.colors.White}
`;

const KaKaopayButton = styled.button`
  width: 28rem;
  height: 4rem;

  border: none;
  border-radius: 1rem;
  box-sizing: border-box;

  background-color: #fee500;
  color: black;
  font-weight: bold;

  ${({ theme }) => theme.fonts.Title4}
  color: ${({ theme }) => theme.colors.Gray1}
`;

const TitleText = styled.div`
  ${({ theme }) => theme.fonts.Title1}
  color: ${({ theme }) => theme.colors.Gray0}
`;

const BodyText = styled.div`
  ${({ theme }) => theme.fonts.Title4}
  color: ${({ theme }) => theme.colors.Gray1}
`;

const PriceText = styled.div`
  position: absolute;
  right: 0;
  ${({ theme }) => theme.fonts.Title5}
  color: ${({ theme }) => theme.colors.Gray1}
`;
