import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import Header from '../../common/Header';
import CenterCarousel from './CenterCarousel';

const SenderMailBox = () => {
  const dears = ['ALL', '예슬', '승엽', '지수', '하람', '효승'];
  const [selectedDear, setSelectedDear] = useState('ALL');

  return (
    <>
      <StListWrapper>
        <Header headerName="보낸 편지함" />
        <StContentWrapper>
          <FilterOptions>
            {dears.map((dear, id) => (
              <FilterButton
                key={id}
                $isSelected={selectedDear === dear}
                onClick={() => setSelectedDear(dear)}
              >
                {dear}
              </FilterButton>
            ))}
          </FilterOptions>
          <CenterCarousel />
        </StContentWrapper>
      </StListWrapper>
    </>
  );
};

export default SenderMailBox;

const StListWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  box-sizing: border-box;
  height: 100%;
  padding: 0 2rem;
  padding-right: 0;
  padding-top: 7rem;

  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.TitleLogo};

  overflow: hidden;

  img {
    width: 100%;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;

  width: 100%;
  margin-bottom: 5rem;
  padding: 1rem 0;

  overflow-x: scroll;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterButton = styled.button`
  width: 5rem;
  padding: 0.6rem 1rem;
  flex-shrink: 0;

  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.MainRed : 'transparent'};
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.colors.White : theme.colors.Gray0)};
  ${({ theme }) => theme.fonts.Body3};

  border-radius: 1.5rem;
  border: 1.5px solid ${({ theme }) => theme.colors.MainRed};
`;
