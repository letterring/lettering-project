// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// const now = new Date();
// const years = Array.from({ length: 10 }, (_, i) => 2025 + i);
// const months = Array.from({ length: 12 }, (_, i) => i + 1);
// const days = Array.from({ length: 31 }, (_, i) => i + 1);
// const ITEM_HEIGHT = 36;
// const SPACER_COUNT = 2;

// export default function DateSelector({ selectedDate, onChangeDate }) {
//   const [selectedYear, setSelectedYear] = useState(now.getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
//   const [selectedDay, setSelectedDay] = useState(now.getDate());

//   const yearRef = useRef(null);
//   const monthRef = useRef(null);
//   const dayRef = useRef(null);

//   useEffect(() => {
//     const scrollToIndex = (ref, index) => {
//       if (ref.current) {
//         ref.current.scrollTop = index * ITEM_HEIGHT;
//       }
//     };
//     scrollToIndex(yearRef, years.indexOf(selectedYear));
//     scrollToIndex(monthRef, months.indexOf(selectedMonth));
//     scrollToIndex(dayRef, days.indexOf(selectedDay));
//   }, []);

//   const handleScroll = (e, type) => {
//     const scrollTop = e.target.scrollTop;
//     const index = Math.round(scrollTop / ITEM_HEIGHT);
//     const newDate = new Date(selectedDate);

//     if (type === 'year') setSelectedYear(years[index]);
//     if (type === 'month') setSelectedMonth(months[index]);
//     if (type === 'day') setSelectedDay(days[index]);

//     onChangeDate(newDate);
//   };

//   const renderOptions = (list, selectedValue) =>
//     [...Array(SPACER_COUNT).fill(''), ...list, ...Array(SPACER_COUNT).fill('')].map(
//       (value, idx) => (
//         <Option key={idx} isSelected={value === selectedValue}>
//           {value}
//         </Option>
//       ),
//     );

//   return (
//     <Wrapper>
//       <ScrollContainer>
//         <Column ref={yearRef} onScroll={(e) => handleScroll(e, 'year')}>
//           {renderOptions(years, selectedYear)}
//         </Column>
//         <Column ref={monthRef} onScroll={(e) => handleScroll(e, 'month')}>
//           {renderOptions(months, selectedMonth)}
//         </Column>
//         <Column ref={dayRef} onScroll={(e) => handleScroll(e, 'day')}>
//           {renderOptions(days, selectedDay)}
//         </Column>
//         <Highlight />
//       </ScrollContainer>
//     </Wrapper>
//   );
// }

// // ---------- Styled Components ----------
// const Wrapper = styled.div`
//   /* padding: 2rem; */
//   text-align: center;
// `;

// const ScrollContainer = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   gap: 1rem;
//   height: ${ITEM_HEIGHT * 5}px;
//   overflow: hidden;
// `;

// const Column = styled.div`
//   overflow-y: scroll;
//   height: ${ITEM_HEIGHT * 5}px;
//   width: 5.5rem;
//   scroll-snap-type: y mandatory;
//   scrollbar-width: none;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
// const Option = styled.div.attrs(({ isSelected }) => ({
//   'data-selected': isSelected,
// }))`
//   height: ${ITEM_HEIGHT}px;
//   line-height: ${ITEM_HEIGHT}px;
//   text-align: center;
//   scroll-snap-align: center;
//   font-size: 1.7rem;
//   font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
//   color: ${({ isSelected, theme }) => (isSelected ? theme.colors.MainRed : theme.colors.Gray2)};
//   ${({ isSelected, theme }) => isSelected && theme.fonts.body1};
// `;

// const Highlight = styled.div`
//   position: absolute;
//   top: ${ITEM_HEIGHT * 2}px;
//   height: ${ITEM_HEIGHT}px;
//   width: 100%;
//   pointer-events: none;
//   border-top: 2px solid ${({ theme }) => theme.colors.MainRed}55;
//   border-bottom: 2px solid ${({ theme }) => theme.colors.MainRed}55;
// `;

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const now = new Date();
const years = Array.from({ length: 10 }, (_, i) => 2025 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const ITEM_HEIGHT = 36;
const SPACER_COUNT = 2;

export default function DateSelector({ selectedDate, onChangeDate }) {
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(now.getDate());

  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

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

    // ✅ 날짜 갱신
    const newDate = new Date(selectedDate);

    if (type === 'year') {
      setSelectedYear(years[index]);
      newDate.setFullYear(years[index]);
    }
    if (type === 'month') {
      setSelectedMonth(months[index]);
      newDate.setMonth(months[index] - 1);
    }
    if (type === 'day') {
      setSelectedDay(days[index]);
      newDate.setDate(days[index]);
    }

    onChangeDate(newDate); // 최종 전달
  };

  const renderOptions = (list, selectedValue) =>
    [...Array(SPACER_COUNT).fill(''), ...list, ...Array(SPACER_COUNT).fill('')].map(
      (value, idx) => (
        <Option key={idx} $isSelected={value === selectedValue}>
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
    </Wrapper>
  );
}

// ---------- Styled Components ----------
const Wrapper = styled.div`
  /* padding: 2rem; */
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
  width: 5.5rem;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

// ✅ Warning 해결: isSelected → $isSelected
const Option = styled.div.attrs(({ $isSelected }) => ({
  'data-selected': $isSelected,
}))`
  height: ${ITEM_HEIGHT}px;
  line-height: ${ITEM_HEIGHT}px;
  text-align: center;
  scroll-snap-align: center;
  font-size: 1.7rem;
  font-weight: ${({ $isSelected }) => ($isSelected ? 'bold' : 'normal')};
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.MainRed : theme.colors.Gray2)};
  ${({ $isSelected, theme }) => $isSelected && theme.fonts.body1};
`;

const Highlight = styled.div`
  position: absolute;
  top: ${ITEM_HEIGHT * 2}px;
  height: ${ITEM_HEIGHT}px;
  width: 100%;
  pointer-events: none;
  border-top: 2px solid ${({ theme }) => theme.colors.MainRed}55;
  border-bottom: 2px solid ${({ theme }) => theme.colors.MainRed}55;
`;
