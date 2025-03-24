import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // ✅ 추가

import SelectTheme from '../../components/sender/SelectTheme/SelectTheme';

const THEME_KEY = 'sealingWaxName';

const SelectThemePage = () => {
  const navigate = useNavigate();
  const [sealingWaxName, setSealingWaxName] = useState('');

  const handleSelectTheme = (theme) => {
    setSealingWaxName(theme);
  };

  const handleConfirm = () => {
    if (sealingWaxName) {
      localStorage.setItem(THEME_KEY, sealingWaxName);
      alert(`${sealingWaxName} 테마가 저장되었습니다!`);
      navigate('/write-letter');
    } else {
      alert('테마를 선택해주세요!');
    }
  };

  return (
    <PageWrapper>
      <Title>디자인 선택</Title>
      <SelectTheme onSelect={handleSelectTheme} selectedTheme={sealingWaxName} />
      {sealingWaxName && <SelectedTheme>{sealingWaxName}</SelectedTheme>}
      <ConfirmButton onClick={handleConfirm} disabled={!sealingWaxName}>
        지금 디자인으로 편지쓰기
      </ConfirmButton>
    </PageWrapper>
  );
};

export default SelectThemePage;

const PageWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.MainRed};
`;

const SelectedTheme = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.Text};
`;

const ConfirmButton = styled.button`
  padding: 12px;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#f44336')};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  margin-top: 20px;
  font-size: 16px;
  transition: background-color 0.2s ease;
`;
