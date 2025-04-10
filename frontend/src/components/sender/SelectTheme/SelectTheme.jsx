import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getSealingWaxList } from '../../../apis/sealingWax';
import BirthdayPreview from '../../../assets/images/theme/birthday_preview.png';
import CongratsPreview from '../../../assets/images/theme/congrats_preview.png';
import LetterPreview from '../../../assets/images/theme/letter_preview.png';
import PostcardPreview from '../../../assets/images/theme/postcard_preview.png';
import SsafycardPreview from '../../../assets/images/theme/ssafy_preview.png';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import SealingWaxCarousel from './SealingWaxCarousel';

const SelectTheme = () => {
  const navigate = useNavigate();

  const [sealingWaxes, setSealingWaxes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);

  const getImageSrc = (themeId) => {
    switch (themeId) {
      case 1:
        return PostcardPreview;
      case 2:
        return LetterPreview;
      case 3:
        return BirthdayPreview;
      case 4:
        return SsafycardPreview;
      case 5:
        return CongratsPreview;
      default:
        return PostcardPreview;
    }
  };

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

      if (selectedTheme.id === 1) {
        navigate('/postcard/writing');
      } else if (selectedTheme.id === 2) {
        navigate('/letter/writing');
      } else if (selectedTheme.id === 3) {
        navigate('/letter/preview/congrats');
      } else if (selectedTheme.id === 4) {
        navigate('/postcard/writing/ssafy');
      } else if (selectedTheme.id === 5) {
        alert('아직 준비중입니다.');
      }
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

      {selectedTheme && <SelectedThemeName>{selectedTheme.sealingWaxName}</SelectedThemeName>}
      {selectedTheme && (
        <RequiredImageCount>필요한 이미지: {selectedTheme.imageCount}장</RequiredImageCount>
      )}
      {selectedTheme && <ExampleImage src={getImageSrc(selectedTheme.id)} />}

      <FixedButtonWrapper>
        <LongButton
          btnName={
            selectedTheme?.id === 5
              ? '아직 준비중인 디자인입니다.'
              : `지금 디자인으로 ${selectedTheme?.designType === 'POSTCARD' ? '엽서' : '편지'}쓰기`
          }
          onClick={handleConfirm}
          opacity={false}
          disabled={selectedTheme?.id === 5}
        />
      </FixedButtonWrapper>
    </Wrapper>
  );
};

export default SelectTheme;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 1rem; */
`;

const SelectedThemeName = styled.div`
  text-align: center;
  ${({ theme }) => theme.fonts.EduTitle1}
  color: ${({ theme }) => theme.colors.Gray3};
`;

const RequiredImageCount = styled.div`
  text-align: center;
  ${({ theme }) => theme.fonts.EduBody3}
  color: ${({ theme }) => theme.colors.Gray4};
`;

const ExampleImage = styled.img`
  width: 100%;
  max-width: 375px;
  height: auto;
  border-radius: 1rem;
  margin-top: 0.8rem;
  /* padding: 1rem; */
`;

const FixedButtonWrapper = styled.div`
  position: fixed;
  bottom: 3rem;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box; // ✅ 이거 추가!
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 10;
`;
