// import React, { useState } from 'react';
// import styled from 'styled-components';

// const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
// const months = Array.from({ length: 12 }, (_, i) => i + 1);
// const days = Array.from({ length: 31 }, (_, i) => i + 1);

// export default function DateSelector({ onNext, onBack }) {
//   const [selectedYear, setSelectedYear] = useState(years[4]);
//   const [selectedMonth, setSelectedMonth] = useState(months[9]);
//   const [selectedDay, setSelectedDay] = useState(days[24]);

//   const handleScroll = (e, type) => {
//     const scrollTop = e.target.scrollTop;
//     const index = Math.round(scrollTop / 40); // 40px = item height
//     if (type === 'year') setSelectedYear(years[index]);
//     if (type === 'month') setSelectedMonth(months[index]);
//     if (type === 'day') setSelectedDay(days[index]);
//   };

//   const renderOptions = (list, selectedValue) =>
//     list.map((value) => (
//       <Option key={value} isSelected={value === selectedValue}>
//         {value}
//       </Option>
//     ));

//   return (
//     <Wrapper>
//       <ScrollContainer>
//         <Column onScroll={(e) => handleScroll(e, 'year')}>
//           <Spacer />
//           {renderOptions(years, selectedYear)}
//           <Spacer />
//         </Column>
//         <Column onScroll={(e) => handleScroll(e, 'month')}>
//           <Spacer />
//           {renderOptions(months, selectedMonth)}
//           <Spacer />
//         </Column>
//         <Column onScroll={(e) => handleScroll(e, 'day')}>
//           <Spacer />
//           {renderOptions(days, selectedDay)}
//           <Spacer />
//         </Column>
//         <Highlight />
//       </ScrollContainer>
//       <ButtonGroup>
//         <ButtonGray onClick={onBack}>이전</ButtonGray>
//         <ButtonRed
//           onClick={() => onNext({ year: selectedYear, month: selectedMonth, day: selectedDay })}
//         >
//           다음
//         </ButtonRed>
//       </ButtonGroup>
//     </Wrapper>
//   );
// }

// // ---------- Styled Components ----------
// const Wrapper = styled.div`
//   padding: 2rem;
//   text-align: center;
// `;

// const Title = styled.h2`
//   color: #b23a3a;
//   margin-bottom: 1.5rem;
// `;

// const ScrollContainer = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   gap: 1rem;
//   height: 11rem;
//   overflow: hidden;
// `;

// const Column = styled.div`
//   overflow-y: scroll;
//   height: 11rem;
//   width: 7rem;
//   scroll-snap-type: y mandatory;
//   scrollbar-width: none;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const Option = styled.div`
//   height: 3rem;
//   line-height: 3rem;
//   scroll-snap-align: center;
//   color: ${({ isSelected }) => (isSelected ? 'white' : '#333')};
//   background-color: ${({ isSelected }) => (isSelected ? '#b23a3a' : 'transparent')};
//   font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
//   border-radius: 10px;
// `;

// const Spacer = styled.div`
//   height: 5rem;
// `;

// const Highlight = styled.div`
//   position: absolute;
//   top: 40px;
//   height: 40px;
//   width: 100%;
//   pointer-events: none;
//   border-top: 2px solid #b23a3a55;
//   border-bottom: 2px solid #b23a3a55;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 2rem;
// `;

// const ButtonGray = styled.button`
//   background: #ccc;
//   padding: 0.8rem 1.5rem;
//   border: none;
//   border-radius: 8px;
//   font-size: 1rem;
// `;

// const ButtonRed = styled.button`
//   background: #b23a3a;
//   padding: 0.8rem 1.5rem;
//   border: none;
//   color: white;
//   border-radius: 8px;
//   font-size: 1rem;
// `;
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const now = new Date();
const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const ITEM_HEIGHT = 48; // rem이 아닌 px 기준으로 정확히 계산됨
const SPACER_COUNT = 2;

export default function DateSelector({ onNext, onBack }) {
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(now.getDate());

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  // 초기 스크롤 위치 설정
  useEffect(() => {
    const scrollToIndex = (ref, index) => {
      if (ref.current) {
        ref.current.scrollTop = index * ITEM_HEIGHT;
      }
    };
    scrollToIndex(yearRef, years.indexOf(selectedYear));
    scrollToIndex(monthRef, months.indexOf(selectedMonth));
    scrollToIndex(dayRef, days.indexOf(selectedDay));
  }, []);

  const handleScroll = (e, type) => {
    const scrollTop = e.target.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    if (type === 'year') setSelectedYear(years[index]);
    if (type === 'month') setSelectedMonth(months[index]);
    if (type === 'day') setSelectedDay(days[index]);
  };

  const renderOptions = (list, selectedValue) =>
    [...Array(SPACER_COUNT).fill(''), ...list, ...Array(SPACER_COUNT).fill('')].map(
      (value, idx) => (
        <Option key={idx} isSelected={value === selectedValue}>
          {value}
        </Option>
      ),
    );

  return (
    <Wrapper>
      <ScrollContainer>
        <Column ref={yearRef} onScroll={(e) => handleScroll(e, 'year')}>
          {renderOptions(years, selectedYear)}
        </Column>
        <Column ref={monthRef} onScroll={(e) => handleScroll(e, 'month')}>
          {renderOptions(months, selectedMonth)}
        </Column>
        <Column ref={dayRef} onScroll={(e) => handleScroll(e, 'day')}>
          {renderOptions(days, selectedDay)}
        </Column>
        <Highlight />
      </ScrollContainer>
      <ButtonGroup>
        <ButtonGray onClick={onBack}>이전</ButtonGray>
        <ButtonRed
          onClick={() => onNext({ year: selectedYear, month: selectedMonth, day: selectedDay })}
        >
          다음
        </ButtonRed>
      </ButtonGroup>
    </Wrapper>
  );
}

// ---------- Styled Components ----------
const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 1rem;
  height: ${ITEM_HEIGHT * 5}px;
  overflow: hidden;
`;

const Column = styled.div`
  overflow-y: scroll;
  height: ${ITEM_HEIGHT * 5}px;
  width: 6rem;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.div`
  height: ${ITEM_HEIGHT}px;
  line-height: ${ITEM_HEIGHT}px;
  text-align: center;
  scroll-snap-align: center;
  font-size: 1.5rem;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#aaa')};
  /* background-color: ${({ isSelected }) => (isSelected ? '#b23a3a' : 'transparent')}; */
  color: ${({ isSelected }) => (isSelected ? '#b23a3a' : '#aaa')};
  border-radius: 10px;
`;

const Highlight = styled.div`
  position: absolute;
  top: ${ITEM_HEIGHT * 2}px;
  height: ${ITEM_HEIGHT}px;
  width: 100%;
  pointer-events: none;
  border-top: 2px solid #b23a3a55;
  border-bottom: 2px solid #b23a3a55;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const ButtonGray = styled.button`
  background: #ccc;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
`;

const ButtonRed = styled.button`
  background: #b23a3a;
  padding: 0.8rem 1.5rem;
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 1rem;
`;
