import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { sendPostcard } from '../../../apis/postcard';
import IconLetter from '../../../assets/images/sender/NormalOption.png';
import IconTimer from '../../../assets/images/sender/OpenTimerOption.png';
import IconCalendar from '../../../assets/images/sender/ScheduledOption.png';
import IconLock from '../../../assets/images/sender/SecretOption.png';
import { PostcardImageFile, PostcardText, SelectedKeyringId } from '../../../recoil/atom';
import Header from '../../common/Header';
import QuestionText from '../SelectDear/QuestionText';
import DeliveryTypeCard from './DeliveryTypeCard';
import ScheduledOption from './ScheduledOption';
import SecretOption from './SecretOption';
import TimerOption from './TimerOption';

const DeliveryType = () => {
  const navigate = useNavigate();

  const selectedKeyringId = useRecoilValue(SelectedKeyringId);
  const postcardImageFile = useRecoilValue(PostcardImageFile);
  const postcardText = useRecoilValue(PostcardText);

  const [selectedModalType, setSelectedModalType] = useState(null);

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
      description: '타이머가 종료되어야 열릴 수 있어요!',
      value: 'TIMECAPSULE',
    },
    {
      icon: IconLock,
      title: '비밀 편지',
      description: '내가 낸 퀴즈를 맞혀야 편지가 열려요!',
      value: 'SECRETTYPE',
    },
    {
      icon: IconCalendar,
      title: '예약 편지',
      description: '예약된 날짜 및 시간에 발송합니다!',
      value: 'SCHEDULED',
    },
  ];

  // ✅ 전송 공통 로직 (NORMAL, SCHEDULED에서 사용)
  const handleSend = async ({ conditionType, scheduledAt = null }) => {
    const sealingWaxId = localStorage.getItem('sealingWaxId');
    if (!sealingWaxId) {
      alert('실링왁스 ID가 없습니다.');
      return;
    }

    const postcardData = {
      keyringId: selectedKeyringId,
      sealingWaxId: Number(sealingWaxId),
      conditionType,
      scheduledAt,
      content: postcardText,
    };

    try {
      await sendPostcard({
        postcardData,
        imageFile: postcardImageFile,
      });

      navigate('/complete/postcard');
    } catch (error) {
      console.error('엽서 전송 실패:', error);
      alert('엽서 전송에 실패했어요.');
    }
  };

  // ✅ 카드 클릭 시 처리
  const handleSelect = (type) => {
    if (type === 'NORMAL') {
      handleSend({ conditionType: 'NONE' });
    } else if (type === 'SCHEDULED' || type === 'TIMECAPSULE' || type === 'SECRETTYPE') {
      setSelectedModalType(type);
    } else {
      alert('해당 전송 방식은 준비 중입니다.');
    }
  };

  return (
    <Wrapper>
      <Header headerName="전송유형 선택" />
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

      {/* ✅ 예약 편지 모달 렌더링 */}
      {selectedModalType === 'SCHEDULED' && (
        <ScheduledOption
          onClose={() => setSelectedModalType(null)}
          onConfirm={(datetime) =>
            handleSend({
              conditionType: 'SCHEDULED',
              scheduledAt: datetime,
            })
          }
        />
      )}
      {selectedModalType === 'TIMECAPSULE' && (
        <TimerOption
          onClose={() => setSelectedModalType(null)}
          onConfirm={(datetime) => {
            handleSend({
              conditionType: 'TIMECAPSULE',
              scheduledAt: datetime,
            });
          }}
        />
      )}
      {selectedModalType === 'SECRETTYPE' && (
        <SecretOption
          onClose={() => setSelectedModalType(null)}
          onConfirm={(secret) => handleSend({ conditionType: 'SECRETTYPE', secret })}
        />
      )}
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
