import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const SelectTheme = () => {
  const [themes, setThemes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sliderRef = useRef(null);

  //  하드코딩 > api 완성되면 삭제 예정
  useEffect(() => {
    const mockData = [
      { id: 1, sealing_wax_name: 'Happy Birthday', image_url: '/temp-images/1.png' },
      { id: 2, sealing_wax_name: 'Love Letter', image_url: '/temp-images/2.png' },
      { id: 3, sealing_wax_name: 'Special Day', image_url: '/temp-images/3.png' },
      { id: 4, sealing_wax_name: 'Thank You', image_url: '/temp-images/4.png' },
      { id: 5, sealing_wax_name: 'Congratulations', image_url: '/temp-images/5.png' },
    ];

    // 무한 스크롤을 위해 데이터 3배 복제
    setThemes([...mockData, ...mockData, ...mockData]);
  }, []);

  //  무한 스크롤 처리
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && themes.length > 0) {
      slider.scrollLeft = slider.scrollWidth / 3;

      const handleScroll = () => {
        if (slider.scrollLeft <= 0) {
          slider.scrollLeft = slider.scrollWidth / 3;
        } else if (slider.scrollLeft >= slider.scrollWidth * (2 / 3)) {
          slider.scrollLeft = slider.scrollWidth / 3;
        }
      };

      slider.addEventListener('scroll', handleScroll);

      return () => {
        slider.removeEventListener('scroll', handleScroll);
      };
    }
  }, [themes]);

  //  실링왁스 클릭 시 선택 상태 설정
  const handleSelectTheme = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Wrapper>
      {/* 실링왁스 선택 영역 */}
      <ThemeWrapper ref={sliderRef}>
        {themes.map((theme, index) => (
          <ThemeItem
            key={`${theme.id}-${index}`}
            $isSelected={index === selectedIndex}
            $backgroundImage={theme.image_url}
            onClick={() => handleSelectTheme(index)} // 클릭 시 -> 선택 상태로
          />
        ))}
      </ThemeWrapper>

      {/*  선택된 실링왁스 이름 */}
      <SelectedThemeName>{themes[selectedIndex]?.sealing_wax_name}</SelectedThemeName>
    </Wrapper>
  );
};

export default SelectTheme;

// 둥둥 떠다니는 애니메이션 정의
const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Wrapper: 전체를 감싸는 컨테이너
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// 선택된 실링왁스 이름 표시
const SelectedThemeName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #b13f3e;
  margin-bottom: 16px;
  height: 24px;
`;

const ThemeWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  padding-left: 100%;
  padding-top: 10%;
  padding-bottom: 10%;

  -ms-overflow-style: none;
  scrollbar-width: none;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
`;

// 선택 상태 강조 효과 적용 + 애니메이션 추가
const ThemeItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isSelected' && prop !== '$backgroundImage',
})`
  flex: 0 0 100px;
  height: 100px;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;

  // 선택 상태 강조 (크기 확대 + 투명도)
  transform: ${(props) => (props.$isSelected ? 'scale(1.5)' : 'scale(1)')};
  opacity: ${(props) => (props.$isSelected ? 1 : 0.6)};

  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  // 선택한 실링왁스 애니메이션
  animation: ${(props) => (props.$isSelected ? floatAnimation : 'none')} 1.5s infinite ease-in-out;

  &:hover {
    transform: ${(props) => (props.$isSelected ? 'scale(1.4)' : 'scale(1.1)')};
  }
`;
