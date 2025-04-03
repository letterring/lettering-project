import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { submitOrder } from '/src/apis/purchase.js';

import { TotalPrice, TotalQuantity } from '../../../recoil/atom';
import Header from '../../common/Header';
import AddressSearch from './AddressSearch';

const Checkout = () => {
  const price = useRecoilValue(TotalPrice);
  const quantity = useRecoilValue(TotalQuantity);

  const [orderNum, setOrderNum] = useState('');
  const [formData, setFormData] = useState({
    realName: '',
    phoneNumber: '',
    email: '',
    zipcode: '',
    roadAddress: '',
    detailAddress: '',
    keyringDesignId: 1,
    quantity,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { orderNumber, paymentUrl } = await submitOrder(formData);

    setOrderNum(orderNumber);

    window.location.assign(paymentUrl);
  };

  return (
    <StCheckoutWrapper>
      <Header headerName="주문/결제" />
      <form onSubmit={handleSubmit}>
        <StBodyWrapper>
          <TitleText>주문자 정보</TitleText>
          <BodyText>이름</BodyText>
          <ContentWrapper>
            <InputField name="realName" value={formData.realName} onChange={handleChange} />
          </ContentWrapper>
          <BodyText>번호</BodyText>
          <ContentWrapper>
            <InputField name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          </ContentWrapper>

          <TitleText>배송지 정보</TitleText>
          <BodyText>우편번호</BodyText>
          <ContentWrapper>
            <InputField name="zipcode" value={formData.zipcode} readOnly />
            <AddressSearch
              setZipcode={(zipcode) => setFormData((prev) => ({ ...prev, zipcode }))}
              setAddress={(roadAddress) => setFormData((prev) => ({ ...prev, roadAddress }))}
            />
          </ContentWrapper>
          <BodyText>기본주소</BodyText>
          <ContentWrapper>
            <InputField name="roadAddress" value={formData.roadAddress} readOnly />
          </ContentWrapper>
          <BodyText>상세주소</BodyText>
          <ContentWrapper>
            <InputField
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleChange}
            />
          </ContentWrapper>

          <TitleText>결제정보</TitleText>
          <BodyText>결제금액</BodyText>
          <ContentWrapper>
            <PriceText>{price}</PriceText>
          </ContentWrapper>

          <KaKaopayButton type="submit">카카오페이</KaKaopayButton>
        </StBodyWrapper>
      </form>
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
  ${({ theme }) => theme.fonts.Title2}
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
