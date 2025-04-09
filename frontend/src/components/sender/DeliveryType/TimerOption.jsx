import React, { useState } from 'react';
import styled from 'styled-components';

import CancelButton from '../../common/button/CancelButton';
import ConfirmButton from '../../common/button/ConfirmButton';
import ConfirmModal from '../../common/modal/ConfirmModal';
import ConfirmSchedule from './ConfirmSchedule';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';

const stepTitles = {
  1: '오픈 날짜 설정',
  2: '오픈 시간 설정',
  3: '오픈 확인',
};

const stepDescriptions = {
  1: '편지를 열 수 있는 날짜를 설정해주세요.',
  2: '편지를 열 수 있는 시간을 설정해주세요.',
  3: '해당 시간 이후에만 편지를 열 수 있어요.',
};

export default function TimerOption({ onClose, onConfirm }) {
  const now = new Date();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(now);
  const [selectedHour, setSelectedHour] = useState(now.getHours());
  const [selectedMinute, setSelectedMinute] = useState(now.getMinutes());

  const handleConfirm = () => {
    const scheduled = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedHour,
      selectedMinute,
    );

    if (scheduled <= new Date()) {
      alert('현재 이후의 시간을 선택해주세요.');
      return;
    }
    onConfirm(scheduled);
    onClose();
  };

  return (
    <ConfirmModal
      isOpen={true}
      onClose={onClose}
      title={
        <div>
          <ModalTitle>{stepTitles[step]}</ModalTitle>
          <ModalDesc>{stepDescriptions[step]}</ModalDesc>
        </div>
      }
    >
      {step === 1 && <DateSelector selectedDate={selectedDate} onChangeDate={setSelectedDate} />}
      {step === 2 && (
        <TimeSelector
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onChangeHour={setSelectedHour}
          onChangeMinute={setSelectedMinute}
        />
      )}
      {step === 3 && (
        <ConfirmSchedule
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onBack={() => setStep(2)}
          onConfirm={handleConfirm}
          onClose={onClose}
          type="TIMECAPSULE"
        />
      )}
      <ModalButtons>
        {step > 1 && <CancelButton onClick={() => setStep(step - 1)} btnName="이전" />}
        {step < 3 && <ConfirmButton onClick={() => setStep(step + 1)} btnName="다음" />}
      </ModalButtons>
    </ConfirmModal>
  );
}

// styled-components
const ModalTitle = styled.div`
  ${({ theme }) => theme.fonts.Title2};
  color: ${({ theme }) => theme.colors.MainRed};
  margin-bottom: 0.4rem;
  text-align: center;
`;

const ModalDesc = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.Gray2};
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;
