import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { TotalQuantity } from '../../../recoil/atom';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import BirdImage from './../../../assets/images/bird_question.svg';
import CustomCardList from './CustomCardList';

const Customize = () => {
  const navigator = useNavigate();
  const [count, setCount] = useRecoilState(TotalQuantity);

  const [cardList, setCardList] = useState(
    Array.from({ length: count }, () => ({
      nickname: 'NaNa',
      message: '새로운 편지가 도착했어요!',
    })),
  );

  const handleChange = (index, field, value) => {
    setCardList((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleCompleteOrder = () => {
    setCount(1);
    navigator('/home');
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
