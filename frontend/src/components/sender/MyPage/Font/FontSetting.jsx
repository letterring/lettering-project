import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { updateFont } from '../../../../apis/mypage';
import { UserFont } from '../../../../recoil/atom';
import Header from '../../../common/Header';
import FontItem from './FontItem';

const FontSetting = () => {
  const navigate = useNavigate();
  const fontEnumList = ['GOMSIN1', 'UHBEE1', 'SAEUM5', 'EDUBODY0'];
  const [userFont, setUserFont] = useRecoilState(UserFont);
  const [selectedFont, setSelectedFont] = useState(userFont);

  useEffect(() => {
    setSelectedFont(userFont);
  }, [userFont]);

  const handleFontChange = async (newFontEnum) => {
    const result = await updateFont(newFontEnum);

    if (!result) return;

    setUserFont(newFontEnum);
    navigate('/mypage');
  };

  return (
    <StFontSettingWrapper>
      <Header headerName="마이페이지" />
      <Title>폰트 설정</Title>
      {fontEnumList.map((fontEnum) => {
        return (
          <FontItem
            key={fontEnum}
            fontEnum={fontEnum}
            isSelected={selectedFont === fontEnum}
            onClick={() => setSelectedFont(fontEnum)}
            onConfirm={() => handleFontChange(fontEnum)}
          />
        );
      })}
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
