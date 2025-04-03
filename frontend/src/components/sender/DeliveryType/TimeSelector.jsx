import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const hours = Array.from({ length: 24 }, (_, i) => i); // 0~23
const minutes = Array.from({ length: 60 }, (_, i) => i); // 0~59
const ITEM_HEIGHT = 36;
const SPACER_COUNT = 2;

export default function TimeSelector({
  selectedHour,
  selectedMinute,
  onChangeHour,
  onChangeMinute,
}) {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  useEffect(() => {
    const scrollToIndex = (ref, index) => {
      if (ref.current) {
        ref.current.scrollTop = index * ITEM_HEIGHT;
      }
    };
    scrollToIndex(hourRef, hours.indexOf(selectedHour));
    scrollToIndex(minuteRef, minutes.indexOf(selectedMinute));
  }, [selectedHour, selectedMinute]);

  const handleScroll = (e, type) => {
    const scrollTop = e.target.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    if (type === 'hour') onChangeHour(hours[index]);
    if (type === 'minute') onChangeMinute(minutes[index]);
  };

  const renderOptions = (list, selectedValue) =>
    [...Array(SPACER_COUNT).fill(''), ...list, ...Array(SPACER_COUNT).fill('')].map(
      (value, idx) => (
        <Option key={idx} $isSelected={value === selectedValue}>
          {value?.toString().padStart(2, '0')}
        </Option>
      ),
    );

  return (
    <Wrapper>
      <ScrollContainer>
        <Column ref={hourRef} onScroll={(e) => handleScroll(e, 'hour')}>
          {renderOptions(hours, selectedHour)}
        </Column>
        <Column ref={minuteRef} onScroll={(e) => handleScroll(e, 'minute')}>
          {renderOptions(minutes, selectedMinute)}
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
  width: 6rem;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

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
