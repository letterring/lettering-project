// src/components/sender/DeliveryType/DeliveryType.jsx
import React from 'react';
import styled from 'styled-components';

import IconLetter from '../../../assets/images/sender/NormalOption.png';
import IconTimer from '../../../assets/images/sender/OpenTimerOption.png';
import IconCalendar from '../../../assets/images/sender/ScheduledOption.png';
import IconLock from '../../../assets/images/sender/SecretOption.png';
import Header from '../../common/Header';
import QuestionText from '../SelectDear/QuestionText';
import DeliveryTypeCard from './DeliveryTypeCard';

const DeliveryType = () => {
  const deliveryTypes = [
    {
      icon: IconLetter,
      title: '일반 편지',
      description: '바로 전송됩니다!',
      value: 'NORMAL',
    },
    {
      icon: IconTimer,
      title: '오픈 타이머',
      description: '타이머 종료 후 읽을 수 있습니다!',
      value: 'TIMER',
    },
    {
      icon: IconLock,
      title: '비밀 편지',
      description: '정답을 맞추면 열리는 편지입니다!',
      value: 'LOCKED',
    },
    {
      icon: IconCalendar,
      title: '예약 편지',
      description: '예약된 날짜 및 시간에 발송합니다!',
      value: 'SCHEDULED',
    },
  ];

  const handleSelect = (type) => {
    console.log('선택된 전송 방식:', type);
    // 추후: Recoil 저장 또는 페이지 이동
  };

  return (
    <Wrapper>
      <Header headerName="전송유형선택" />
      <QuestionTextWrapper>
        <QuestionText text="전송 방식을 선택해주세요!" />
      </QuestionTextWrapper>

      <CardList>
        {deliveryTypes.map((type) => (
          <DeliveryTypeCard
            key={type.value}
            icon={type.icon}
            title={type.title}
            description={type.description}
            onClick={() => handleSelect(type.value)}
          />
        ))}
      </CardList>
    </Wrapper>
  );
};

export default DeliveryType;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  user-select: none;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const QuestionTextWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;
