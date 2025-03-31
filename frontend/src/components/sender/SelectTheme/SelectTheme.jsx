import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getSealingWaxList } from '../../../apis/sealingWax';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import SealingWaxCarousel from './SealingWaxCarousel';

const SelectTheme = () => {
  const navigate = useNavigate();

  const [sealingWaxes, setSealingWaxes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSealingWaxList();
        setSealingWaxes(data);

        const storedId = localStorage.getItem('sealingWaxId');
        const matched = data.find((item) => item.id === Number(storedId));
        setSelectedTheme(matched || data[0]);
      } catch (error) {
        console.error('실링왁스 불러오기 실패:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
  };

  const handleConfirm = () => {
    if (selectedTheme) {
      localStorage.setItem('sealingWaxId', selectedTheme.id);
      navigate('/postcard/writing');
    } else {
      alert('테마를 선택해주세요!');
    }
  };

  return (
    <Wrapper>
      <Header headerName="디자인 선택" />

      <SealingWaxCarousel
        sealingWaxes={sealingWaxes}
        onSelect={handleSelectTheme}
        selectedTheme={selectedTheme}
      />

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
  position: fixed;
  bottom: 3rem;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box; // ✅ 이거 추가!
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 10;
`;
