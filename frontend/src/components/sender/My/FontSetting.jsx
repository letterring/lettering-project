import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import FontItem from './FontItem';

const fontList = ['GangwonEduSaeeum', 'Gomsin'];

const FontSetting = () => {
  const [selectedFont, setSelectedFont] = useState('GangwonEduAll');
  const navigate = useNavigate();

  const handleFontChange = (font) => {
    console.log('선택된 폰트:', font);
    // 추후 recoil, api로 저장 로직 추가 예정
    navigate('/mypage'); // 이전 페이지로 돌아가기
  };

  return (
    <StFontSettingWrapper>
      <Title>폰트 설정</Title>
      {fontList.map((font) => (
        <FontItem
          key={font}
          fontName={font}
          isSelected={selectedFont === font}
          onClick={() => setSelectedFont(font)}
          onConfirm={() => handleFontChange(font)}
        />
      ))}
    </StFontSettingWrapper>
  );
};

export default FontSetting;

const StFontSettingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 5rem;
  gap: 1rem;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Title2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 3rem;
  box-sizing: border-box;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
