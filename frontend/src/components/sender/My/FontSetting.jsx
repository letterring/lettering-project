import React from 'react';
import styled from 'styled-components';

const FontSetting = () => {
  return <StFontSettingWrapper>폰트 설정</StFontSettingWrapper>;
};
export default FontSetting;

const StFontSettingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 5rem;
`;
