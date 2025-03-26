import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import SealingWaxCarousel from './SealingWaxCarousel';

const SelectTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const storedThemeId = localStorage.getItem('sealingWaxId');
    const mockData = [
      { id: 1, sealing_wax_name: 'Happy Birthday', image_url: '/temp-images/1.png' },
      { id: 2, sealing_wax_name: 'Love Letter', image_url: '/temp-images/2.png' },
      { id: 3, sealing_wax_name: 'Special Day', image_url: '/temp-images/3.png' },
      { id: 4, sealing_wax_name: 'Thank You', image_url: '/temp-images/4.png' },
      { id: 5, sealing_wax_name: 'Congratulations', image_url: '/temp-images/5.png' },
    ];

    if (storedThemeId) {
      const storedTheme = mockData.find((theme) => theme.id === Number(storedThemeId));
      setSelectedTheme(storedTheme || mockData[0]);
    } else {
      setSelectedTheme(mockData[0]);
    }
  }, []);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
  };

  const handleConfirm = () => {
    if (selectedTheme) {
      localStorage.setItem('sealingWaxId', selectedTheme.id);
      // console.log(`${selectedTheme.sealing_wax_name} 테마가 저장되었습니다!`);
    } else {
      alert('테마를 선택해주세요!');
    }
  };

  return (
    <Wrapper>
      <Header headerName="디자인 선택" />

      <SealingWaxCarousel onSelect={handleSelectTheme} selectedTheme={selectedTheme} />

      {selectedTheme && <SelectedThemeName>{selectedTheme.sealing_wax_name}</SelectedThemeName>}

      {selectedTheme && <ExampleImage src={`/temp-images/${selectedTheme.id + 10}.png`} />}

      <FixedButtonWrapper>
        <LongButton btnName="지금 디자인으로 편지쓰기" onClick={handleConfirm} opacity={false} />
      </FixedButtonWrapper>
    </Wrapper>
  );
};

export default SelectTheme;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SelectedThemeName = styled.div`
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.MainRed};
`;

const ExampleImage = styled.img`
  width: 90%;
  height: auto;
  border-radius: 1rem;
  margin-top: 0.8rem;
  padding: 1rem;
`;

const FixedButtonWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;
  background-color: transparent;
`;
