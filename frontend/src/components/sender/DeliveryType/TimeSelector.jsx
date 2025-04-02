import React from 'react';
import styled from 'styled-components';

const TimeSelector = ({
  selectedHour,
  selectedMinute,
  onChangeHour,
  onChangeMinute,
  onNext,
  onBack,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Container>
      <SelectGroup>
        <Select value={selectedHour} onChange={(e) => onChangeHour(Number(e.target.value))}>
          {hours.map((h) => (
            <option key={h} value={h}>
              {h}시
            </option>
          ))}
        </Select>
        <Select value={selectedMinute} onChange={(e) => onChangeMinute(Number(e.target.value))}>
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}분
            </option>
          ))}
        </Select>
      </SelectGroup>
      <ButtonGroup>
        <SubButton onClick={onBack}>이전</SubButton>
        <MainButton onClick={onNext}>다음</MainButton>
      </ButtonGroup>
    </Container>
  );
};

export default TimeSelector;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const SelectGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const SubButton = styled.button`
  background-color: #ccc;
  color: black;
  padding: 0.6rem 1.6rem;
  border: none;
  border-radius: 0.6rem;
  font-size: 1rem;
`;

const MainButton = styled.button`
  background-color: #d64545;
  color: white;
  padding: 0.6rem 1.6rem;
  border: none;
  border-radius: 0.6rem;
  font-size: 1rem;
`;
