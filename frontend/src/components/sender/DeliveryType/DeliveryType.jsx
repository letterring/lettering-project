import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { sendLetter } from '../../../apis/letter';
import { sendPostcard } from '../../../apis/postcard';
import IconLetter from '../../../assets/images/sender/NormalOption.png';
import IconTimer from '../../../assets/images/sender/OpenTimerOption.png';
import IconCalendar from '../../../assets/images/sender/ScheduledOption.png';
import IconLock from '../../../assets/images/sender/SecretOption.png';
import {
  LetterImageList,
  LetterTextList,
  PostcardImageFile,
  PostcardText,
  SelectedKeyringId,
} from '../../../recoil/atom';
import Header from '../../common/Header';
import QuestionText from '../SelectDear/QuestionText';
import DeliveryTypeCard from './DeliveryTypeCard';

const DeliveryType = () => {
  const navigate = useNavigate();

  const selectedKeyringId = useRecoilValue(SelectedKeyringId);
  const postcardImageFile = useRecoilValue(PostcardImageFile);
  const postcardText = useRecoilValue(PostcardText);
  const letterTextList = useRecoilValue(LetterTextList);
  const letterImageList = useRecoilValue(LetterImageList);

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
      value: 'TIMER',
    },
    {
      icon: IconLock,
      title: '비밀 편지',
      description: '내가 낸 퀴즈를 맞혀야 편지가 열려요!',
      value: 'LOCKED',
    },
    {
      icon: IconCalendar,
      title: '예약 편지',
      description: '예약된 날짜 및 시간에 발송합니다!',
      value: 'SCHEDULED',
    },
  ];

  const postLetter = async (letterData) => {
    sendLetter(letterData, letterImageList)
      .then(() => {
        // 성공 처리
      })
      .catch((error) => {
        console.error('편지 전송 실패:', error);
        alert('편지 전송을 실패했어요.');
      });

    const firstImageURL =
      letterImageList.length > 0 ? URL.createObjectURL(letterImageList[0].file) : null;

    navigate(`/complete/letter`, { state: { firstImageURL } });
  };

  const postPostcard = async (postcardData) => {
    sendPostcard({
      postcardData,
      imageFile: postcardImageFile,
    })
      .then(() => {
        // 성공 처리
      })
      .catch((error) => {
        console.error('엽서 전송 실패:', error);
        alert('엽서 전송을 실패했어요.');
      });

    const firstImageURL = postcardImageFile ? URL.createObjectURL(postcardImageFile) : null;

    navigate(`/complete/postcard`, { state: { firstImageURL } });
  };

  const handleSelect = async (type) => {
    console.log('선택된 전송 방식:', type);

    const sealingWaxId = localStorage.getItem('sealingWaxId');
    if (!sealingWaxId) {
      alert('실링왁스 ID가 없습니다.');
      return;
    }

    if (type === 'NORMAL') {
      if (sealingWaxId == 1) {
        //엽서
        const postcardData = {
          keyringId: selectedKeyringId,
          sealingWaxId: Number(sealingWaxId),
          conditionType: 'NONE',
          content: postcardText,
        };

        postPostcard(postcardData);
      } else {
        //편지
        const letterData = {
          keyringId: selectedKeyringId,
          sealingWaxId: Number(sealingWaxId),
          conditionType: 'NONE',
          contents: letterTextList,
        };

        postLetter(letterData);
      }
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
