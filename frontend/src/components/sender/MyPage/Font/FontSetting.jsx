import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { updateFont } from '../../../../apis/mypage';
import { UserFont } from '../../../../recoil/userInfo';
import Header from '../../../common/Header';
import FontItem from './FontItem';

const FontSetting = () => {
  const navigate = useNavigate();
  const fontList = ['Gomsin', 'GangwonEduAll'];
  const [userFont, setUserFont] = useRecoilState(UserFont);
  const [selectedFont, setSelectedFont] = useState(userFont);

  const handleFontChange = async (newFont) => {
    const data = await updateFont(newFont);
    setUserFont(newFont);
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
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 6rem 2rem;
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
