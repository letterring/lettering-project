import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { submitKeyringCustomization } from '../../../apis/purchase';
import { KeyringCustomList, TotalQuantity } from '../../../recoil/atom';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import BirdImage from './../../../assets/images/bird_question.svg';
import CustomCardList from './CustomCardList';

const Customize = () => {
  const navigator = useNavigate();
  const [cardList, setCardList] = useRecoilState(KeyringCustomList);

  const handleChange = (index, field, value) => {
    const updated = cardList.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setCardList(updated);
  };

  const handleCompleteOrder = async () => {
    const data = submitKeyringCustomization(cardList);
    navigator('/purchase/complete');
  };

  return (
    <StCustomizeWrapper>
      <Header headerName="키링커스텀설정" />
      <StContentWrapper>
        <TitleText>주문이 거의 완료되었어요</TitleText>
        <SubTitle>상대에게 전해줄 키링 정보를 설정해주세요</SubTitle>
        <img src={BirdImage} alt="물음표 새" />
        <CustomCardList cardList={cardList} onChange={handleChange} />
        <LongButton btnName="주문 완료하기" onClick={handleCompleteOrder} />
      </StContentWrapper>
    </StCustomizeWrapper>
  );
};

export default Customize;

const StCustomizeWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  margin: 7rem 3rem;
  padding-top: 3rem;
  gap: 1rem;
`;

const TitleText = styled.div`
  ${({ theme }) => theme.fonts.Title2}
  color: ${({ theme }) => theme.colors.Gray0}
`;

const SubTitle = styled.div`
  ${({ theme }) => theme.fonts.Title4}
  color: ${({ theme }) => theme.colors.Gray2}
`;
