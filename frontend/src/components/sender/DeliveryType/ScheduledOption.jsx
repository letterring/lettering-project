import React, { useState } from 'react';
import styled from 'styled-components';

import CancelButton from '../../common/button/CancelButton';
import ConfirmButton from '../../common/button/ConfirmButton';
import ConfirmModal from '../../common/modal/ConfirmModal';
import ConfirmSchedule from './ConfirmSchedule';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';

const stepTitles = {
  1: '예약 날짜 설정',
  2: '예약 시간 설정',
  3: '예약 확인',
};
const stepDescriptions = {
  1: '예약할 날짜를 선택해주세요.',
  2: '예약할 시간을 선택해주세요.',
  3: '예약 정보를 확인하고 완료 버튼을 눌러주세요.',
};

const ScheduledOption = ({ onClose, onConfirm }) => {
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
      {step === 1 && (
        <>
          <DateSelector selectedDate={selectedDate} onChangeDate={setSelectedDate} />
          <ModalButtons>
            <ConfirmButton onClick={() => setStep(2)} btnName="다음" />
          </ModalButtons>
        </>
      )}
      {step === 2 && (
        <>
          <TimeSelector
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            onChangeHour={setSelectedHour}
            onChangeMinute={setSelectedMinute}
          />
          <ModalButtons>
            <CancelButton onClick={() => setStep(1)} btnName="이전" />
            <ConfirmButton onClick={() => setStep(3)} btnName="다음" />
          </ModalButtons>
        </>
      )}
      {step === 3 && (
        <ConfirmSchedule
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onBack={() => setStep(2)}
          onConfirm={handleConfirm}
          onClose={onClose}
          type="SCHEDULED"
        />
      )}
    </ConfirmModal>
  );
};

export default ScheduledOption;

const FinalStep = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

const ModalTitle = styled.div`
  ${({ theme }) => theme.fonts.Title2};
  color: ${({ theme }) => theme.colors.MainRed};
  margin-bottom: 0.4rem;
`;

const ModalDesc = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.Gray2};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 2rem;
`;
