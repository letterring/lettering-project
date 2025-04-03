import { format } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

import CancelButton from '../../common/button/CancelButton';
import ConfirmButton from '../../common/button/ConfirmButton';
import ConfirmModal from '../../common/modal/ConfirmModal';

const ConfirmSchedule = ({
  selectedDate,
  selectedHour,
  selectedMinute,
  onBack,
  onConfirm,
  onClose,
  type,
}) => {
  const isTimeCapsule = type === 'TIMECAPSULE';

  const datetime = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    selectedHour,
    selectedMinute,
  );

  const formattedDate = selectedDate
    ? `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
    : '';
  const formattedTime = `${String(selectedHour).padStart(2, '0')}시 ${String(selectedMinute).padStart(2, '0')}분`;

  return (
    // <ConfirmModal isOpen={true} onClose={onClose}>
    //   <Wrapper>
    //     <Title>예약 확인</Title>
    //     <Description>예약 일정을 확인하고 완료 버튼을 눌러주세요.</Description>
    //     <HighlightText>
    //       {formattedDate} {formattedTime}
    //     </HighlightText>

    //     <ButtonGroup>
    //       <CancelButton btnName="이전" onClick={onBack} />
    //       <ConfirmButton btnName="완료" onClick={onConfirm} />
    //     </ButtonGroup>
    //   </Wrapper>
    // </ConfirmModal>
    <ConfirmModal
      isOpen={true}
      onClose={onClose}
      title={
        <Wrapper>
          <ModalTitle>{type === 'TIMECAPSULE' ? '오픈 타이머 확인' : '예약 시간 확인'}</ModalTitle>
          <ModalDesc>
            {type === 'TIMECAPSULE'
              ? '해당 시간 이후에만 편지를 열 수 있어요.'
              : '예약된 시간에 편지가 발송돼요.'}
          </ModalDesc>
        </Wrapper>
      }
    >
      <TimeText>
        <HighlightText>{format(datetime, 'yyyy년 MM월 dd일 HH시 mm분')}</HighlightText>
      </TimeText>

      <ModalButtons>
        <CancelButton onClick={onClose} btnName="이전" />
        <ConfirmButton onClick={onConfirm} btnName="확인" />
      </ModalButtons>
    </ConfirmModal>
  );
};

export default ConfirmSchedule;

const Wrapper = styled.div`
  padding: 0 2rem;
  /* text-align: center; */
  /* max-width: 100%; */
`;

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
`;

const TimeText = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.MainRed};
  text-align: center;
`;

const HighlightText = styled.span`
  font-weight: bold;

  ${({ theme }) => theme.fonts.Saeum3};
  color: ${({ theme }) => theme.colors.MainRed};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 2rem;
`;
