// import React, { useState } from 'react';
// import styled from 'styled-components';

// import ConfirmModal from '../../common/modal/ConfirmModal';

// const ScheduledOption = ({ onClose, onConfirm }) => {
//   const now = new Date();

//   const [year, setYear] = useState(now.getFullYear());
//   const [month, setMonth] = useState(now.getMonth() + 1);
//   const [day, setDay] = useState(now.getDate());

//   const generateRange = (start, end) =>
//     Array.from({ length: end - start + 1 }, (_, i) => start + i);

//   const getLastDay = (year, month) => new Date(year, month, 0).getDate();

//   const handleConfirm = () => {
//     const selected = new Date(year, month - 1, day);

//     if (selected <= new Date()) {
//       alert('오늘 이후 날짜를 선택해주세요!');
//       return;
//     }

//     onConfirm(selected);
//     onClose();
//   };

//   return (
//     <ConfirmModal title="예약 날짜를 선택하세요" isOpen={true} onClose={onClose}>
//       <SelectorWrapper>
//         <Select value={year} onChange={(e) => setYear(Number(e.target.value))}>
//           {generateRange(now.getFullYear(), now.getFullYear() + 2).map((y) => (
//             <option key={y} value={y}>
//               {y}년
//             </option>
//           ))}
//         </Select>

//         <Select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
//           {generateRange(1, 12).map((m) => (
//             <option key={m} value={m}>
//               {m}월
//             </option>
//           ))}
//         </Select>

//         <Select value={day} onChange={(e) => setDay(Number(e.target.value))}>
//           {generateRange(1, getLastDay(year, month)).map((d) => (
//             <option key={d} value={d}>
//               {d}일
//             </option>
//           ))}
//         </Select>
//       </SelectorWrapper>

//       <ModalButtons>
//         <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
//       </ModalButtons>
//     </ConfirmModal>
//   );
// };

// export default ScheduledOption;

// // 스타일
// const SelectorWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 1rem;
//   padding: 1rem 0;
// `;

// const Select = styled.select`
//   padding: 0.6rem 1rem;
//   border-radius: 6px;
//   border: 1px solid #ccc;
//   font-size: 1rem;
// `;

// const ModalButtons = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 1.5rem;
// `;

// const ConfirmButton = styled.button`
//   background-color: #222;
//   color: white;
//   border: none;
//   padding: 0.8rem 2rem;
//   border-radius: 6px;
//   font-size: 1rem;
//   cursor: pointer;
// `;
// ScheduledOption.jsx
// ScheduledOption.jsx

import React, { useState } from 'react';
import styled from 'styled-components';

import ConfirmModal from '../../common/modal/ConfirmModal';
import DateSelector from './DateSelector';
import TimeSelector from './TimeSelector';

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
    <ConfirmModal title="예약 날짜 설정" isOpen={true} onClose={onClose}>
      {step === 1 && (
        <DateSelector
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <TimeSelector
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onChangeHour={setSelectedHour}
          onChangeMinute={setSelectedMinute}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <FinalStep>
          <p>
            <strong>
              {selectedDate.getFullYear()}년 {selectedDate.getMonth() + 1}월{' '}
              {selectedDate.getDate()}일 {selectedHour}시 {selectedMinute}분
            </strong>{' '}
            에 전송됩니다.
          </p>
          <FinalButton onClick={handleConfirm}>완료</FinalButton>
        </FinalStep>
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

const FinalButton = styled.button`
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.MainRed || '#d64545'};
  color: white;
  font-size: 1.4rem;
  padding: 1rem 2.4rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
`;
