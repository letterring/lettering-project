import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getUserAdress, submitOrder } from '/src/apis/purchase.js';

import { OrderNumber, TotalPrice, TotalQuantity } from '../../../recoil/atom';
import Header from '../../common/Header';
import AddressSearch from './AddressSearch';

const Checkout = () => {
  const price = useRecoilValue(TotalPrice);
  const quantity = useRecoilValue(TotalQuantity);
  const setOrderNum = useSetRecoilState(OrderNumber);
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

  useEffect(() => {
    const fetchAddress = async () => {
      const { status, data } = await getUserAdress();
      if (status === 200) {
        setFormData((prev) => ({
          ...prev,
          realName: data.realName || '',
          phoneNumber: data.phoneNumber || '',
          email: data.email || '',
          zipcode: data.zipcode || '',
          roadAddress: data.roadAddress || '',
          detailAddress: data.detailAddress || '',
        }));
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const { orderNumber, pcUrl, mobileUrl } = await submitOrder(formData);

    setOrderNum(orderNumber);

    window.location.assign(isMobile ? mobileUrl : pcUrl);
  };

  return (
    <StCheckoutWrapper>
      <Header headerName="주문/결제" />
      <StWrapper>
        <form onSubmit={handleSubmit}>
          <StBodyWrapper>
            <TitleText>주문자 정보</TitleText>
            <BodyText>이름</BodyText>
            <ContentWrapper>
              <InputField name="realName" value={formData.realName} onChange={handleChange} />
            </ContentWrapper>
            <BodyText>휴대전화</BodyText>
            <ContentWrapper>
              <InputField name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </ContentWrapper>

            <TitleText>배송지 정보</TitleText>
            <BodyText>우편번호</BodyText>
            <PostCodeWrapper>
              <StContentWrapper>
                <InputField
                  name="zipcode"
                  value={formData.zipcode}
                  placeholder="우편번호"
                  readOnly
                />
                <AddressSearch
                  setZipcode={(zipcode) => setFormData((prev) => ({ ...prev, zipcode }))}
                  setAddress={(roadAddress) => setFormData((prev) => ({ ...prev, roadAddress }))}
                />
              </StContentWrapper>
            </PostCodeWrapper>
            <BodyText>주소</BodyText>
            <ContentWrapper>
              <InputField
                name="roadAddress"
                value={formData.roadAddress}
                placeholder="기본주소"
                readOnly
              />
            </ContentWrapper>
            <ContentWrapper>
              <InputField
                name="detailAddress"
                value={formData.detailAddress}
                onChange={handleChange}
                placeholder="상세주소"
              />
            </ContentWrapper>

            <TitleText>결제정보</TitleText>
            <BodyText>결제금액</BodyText>
            <ContentWrapper>
              <PriceText>{price}</PriceText>
            </ContentWrapper>

            <KaKaopayButton type="submit">카카오페이로 결제하기</KaKaopayButton>
          </StBodyWrapper>
        </form>
      </StWrapper>
    </StCheckoutWrapper>
  );
};

export default Checkout;

const StCheckoutWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  form {
    background-color: white;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

const StWrapper = styled.div`
  flex: 1;
  padding-top: 7rem;

  display: flex;
  flex-direction: column;
`;

const StBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  box-sizing: border-box;
  gap: 1rem;
  flex: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 3rem;

  flex: 1;
`;

const StContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 3rem;
  gap: 0.5rem;
`;

const InputField = styled.input`
  width: 100%;
  height: 3rem;
  padding-left: 0.5rem;

  outline: none;

  background-color: transparent;
  border: solid ${({ theme }) => theme.colors.Gray5};
  border-radius: 0.625rem;

  ${({ theme }) => theme.fonts.Body4}
`;

const PostCodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const KaKaopayButton = styled.button`
  width: 100%;
  height: 4.5rem;

  border: none;
  border-radius: 1rem;
  box-sizing: border-box;
  margin-top: 1rem;

  background-color: #fee500;
  color: black;
  font-weight: bold;

  ${({ theme }) => theme.fonts.Title4}
  color: ${({ theme }) => theme.colors.Gray1}
`;

const TitleText = styled.div`
  padding-top: 1.5rem;
  ${({ theme }) => theme.fonts.Title2}
  color: ${({ theme }) => theme.colors.MainRed}
`;

const BodyText = styled.div`
  ${({ theme }) => theme.fonts.Title4}
  color: ${({ theme }) => theme.colors.Gray1}
`;

const PriceText = styled.div`
  position: absolute;
  right: 1rem;
  ${({ theme }) => theme.fonts.Title2}
  color: ${({ theme }) => theme.colors.Gray1}
`;
