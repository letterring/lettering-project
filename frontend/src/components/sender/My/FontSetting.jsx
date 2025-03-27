import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { FontList, UserFont } from '../../../recoil/userInfo';
import Header from '../../common/Header';
import FontItem from './FontItem';

const FontSetting = () => {
  const navigate = useNavigate();
  const fontList = useRecoilValue(FontList);
  const [userFont, setUserFont] = useRecoilState(UserFont);
  const [selectedFont, setSelectedFont] = useState(userFont);

  const handleFontChange = (font) => {
    setUserFont(font);
    // TODO: 여기에 API 저장 로직 추가 가능
    navigate('/mypage');
  };

  useEffect(() => {
    setSelectedFont(userFont);
  }, [userFont]);

  return (
    <StFontSettingWrapper>
      <Header headerName="마이페이지" />
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
