// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// import SealingWaxItem from './SealingWaxItem';

// const SealingWaxCarousel = ({ onSelect, selectedTheme }) => {
//   const [themes, setThemes] = useState([]);
//   const sliderRef = useRef(null);

//   // ✅ 하드코딩된 데이터 → API 완성 시 교체 예정
//   useEffect(() => {
//     const mockData = [
//       { id: 1, sealing_wax_name: 'Happy Birthday', image_url: '/temp-images/1.png' },
//       { id: 2, sealing_wax_name: 'Love Letter', image_url: '/temp-images/2.png' },
//       { id: 3, sealing_wax_name: 'Special Day', image_url: '/temp-images/3.png' },
//       { id: 4, sealing_wax_name: 'Thank You', image_url: '/temp-images/4.png' },
//       { id: 5, sealing_wax_name: 'Congratulations', image_url: '/temp-images/5.png' },
//     ];

//     // ✅ 무한 스크롤용 데이터 3배 복제
//     setThemes([...mockData, ...mockData, ...mockData]);
//   }, []);

//   // ✅ 무한 스크롤 처리
//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (slider) {
//       slider.scrollLeft = slider.scrollWidth / 3;

//       const handleScroll = () => {
//         if (slider.scrollLeft <= 0) {
//           slider.scrollLeft = slider.scrollWidth / 3;
//         } else if (slider.scrollLeft >= slider.scrollWidth * (2 / 3)) {
//           slider.scrollLeft = slider.scrollWidth / 3;
//         }
//       };

//       slider.addEventListener('scroll', handleScroll);
//       return () => slider.removeEventListener('scroll', handleScroll);
//     }
//   }, [themes]);

//   // ✅ 실링왁스 클릭 시 선택 상태 설정
//   const handleSelect = (index) => {
//     onSelect(themes[index].sealing_wax_name);
//   };

//   return (
//     <Wrapper>
//       <CarouselContainer ref={sliderRef}>
//         {themes.map((theme, index) => (
//           <SealingWaxItem
//             key={`${theme.id}-${index}`}
//             theme={theme}
//             isSelected={theme.sealing_wax_name === selectedTheme}
//             onClick={() => handleSelect(index)}
//           />
//         ))}
//       </CarouselContainer>
//     </Wrapper>
//   );
// };

// export default SealingWaxCarousel;

// const Wrapper = styled.div`
//   width: 100%; // ✅ 부모 요소의 크기를 고정
//   overflow: hidden;
// `;

// const CarouselContainer = styled.div`
//   display: flex;
//   width: 100%;
//   height: 12rem;
//   gap: 2.5rem;
//   margin: 0;
//   overflow-x: scroll;
//   scroll-snap-type: x mandatory;
//   -ms-overflow-style: none;
//   scrollbar-width: none;
//   padding: 0; //

//   ::-webkit-scrollbar {
//     display: none;
//   }
// `;

/////////////////////////

// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// import SealingWaxItem from './SealingWaxItem';

// const SealingWaxCarousel = ({ onSelect, selectedTheme }) => {
//   const [themes, setThemes] = useState([]);
//   const sliderRef = useRef(null);

//   // ✅ 하드코딩된 데이터 → API 완성 시 교체 예정
//   useEffect(() => {
//     const mockData = [
//       {
//         id: 1,
//         sealing_wax_name: 'Happy Birthday',
//         image_url: '/temp-images/1.png',
//         sample_image: '/temp-images/11.png', // ✅ 예시 이미지 경로 추가
//       },
//       {
//         id: 2,
//         sealing_wax_name: 'Love Letter',
//         image_url: '/temp-images/2.png',
//         sample_image: '/temp-images/21.png', // ✅ 예시 이미지 경로 추가
//       },
//       {
//         id: 3,
//         sealing_wax_name: 'Special Day',
//         image_url: '/temp-images/3.png',
//         sample_image: '/temp-images/3.png', // ✅ 예시 이미지 동일 처리
//       },
//       {
//         id: 4,
//         sealing_wax_name: 'Thank You',
//         image_url: '/temp-images/4.png',
//         sample_image: '/temp-images/4.png',
//       },
//       {
//         id: 5,
//         sealing_wax_name: 'Congratulations',
//         image_url: '/temp-images/5.png',
//         sample_image: '/temp-images/5.png',
//       },
//     ];

//     setThemes(mockData);
//   }, []);

//   const handleSelect = (index) => {
//     onSelect(themes[index]);
//   };

//   return (
//     <Wrapper>
//       <CarouselContainer ref={sliderRef}>
//         {themes.map((theme, index) => (
//           <SealingWaxItem
//             key={`${theme.id}-${index}`}
//             theme={theme}
//             isSelected={theme.sealing_wax_name === selectedTheme?.sealing_wax_name}
//             onClick={() => handleSelect(index)}
//           />
//         ))}
//       </CarouselContainer>

//       {/* ✅ 선택된 상태에서 예시 이미지 표시 */}
//       {selectedTheme && <SampleImage src={selectedTheme.sample_image} alt="Sample Preview" />}
//     </Wrapper>
//   );
// };

// export default SealingWaxCarousel;

// const Wrapper = styled.div`
//   width: 100%;
//   overflow: hidden;
// `;

// const CarouselContainer = styled.div`
//   display: flex;
//   width: 100%;
//   height: 12rem;
//   gap: 2.5rem;
//   margin: 0;
//   overflow-x: scroll;
//   scroll-snap-type: x mandatory;
//   -ms-overflow-style: none;
//   scrollbar-width: none;
//   padding: 0;

//   ::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const SampleImage = styled.img`
//   width: 100%; // ✅ 화면 가득 채우기
//   height: auto;
//   margin-top: 1rem;
//   object-fit: cover;
//   border-radius: 10px;
// `;
///////////
// import React, { useEffect, useRef, useState } from 'react';
// import styled from 'styled-components';

// import SealingWaxItem from './SealingWaxItem';

// const SealingWaxCarousel = ({ onSelect, selectedTheme }) => {
//   const [themes, setThemes] = useState([]);
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const mockData = [
//       { id: 1, sealing_wax_name: 'Happy Birthday', image_url: '/temp-images/1.png' },
//       { id: 2, sealing_wax_name: 'Love Letter', image_url: '/temp-images/2.png' },
//       { id: 3, sealing_wax_name: 'Special Day', image_url: '/temp-images/3.png' },
//       { id: 4, sealing_wax_name: 'Thank You', image_url: '/temp-images/4.png' },
//       { id: 5, sealing_wax_name: 'Congratulations', image_url: '/temp-images/5.png' },
//     ];

//     setThemes(mockData);
//   }, []);

//   const handleSelect = (index) => {
//     onSelect(themes[index]);
//   };

//   return (
//     <Wrapper>
//       <CarouselContainer ref={sliderRef}>
//         {themes.map((theme, index) => (
//           <SealingWaxItem
//             key={`${theme.id}-${index}`}
//             theme={theme}
//             isSelected={theme.sealing_wax_name === selectedTheme?.sealing_wax_name}
//             onClick={() => handleSelect(index)}
//           />
//         ))}
//       </CarouselContainer>
//     </Wrapper>
//   );
// };

// export default SealingWaxCarousel;

// const Wrapper = styled.div`
//   width: 100%;
//   overflow: hidden;
// `;

// const CarouselContainer = styled.div`
//   display: flex;
//   gap: 1.5rem;
//   overflow-x: auto;
//   scroll-snap-type: x mandatory;
//   padding: 0;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import SealingWaxItem from './SealingWaxItem';

const SealingWaxCarousel = ({ onSelect, selectedTheme }) => {
  const [themes, setThemes] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const mockData = [
      { id: 1, sealing_wax_name: 'Happy Birthday', image_url: '/temp-images/1.png' },
      { id: 2, sealing_wax_name: 'Love Letter', image_url: '/temp-images/2.png' },
      { id: 3, sealing_wax_name: 'Special Day', image_url: '/temp-images/3.png' },
      { id: 4, sealing_wax_name: 'Thank You', image_url: '/temp-images/4.png' },
      { id: 5, sealing_wax_name: 'Congratulations', image_url: '/temp-images/5.png' },
    ];

    setThemes(mockData);
  }, []);

  const handleSelect = (index) => {
    onSelect(themes[index]);
  };

  return (
    <Wrapper>
      <CarouselContainer ref={sliderRef}>
        {themes.map((theme, index) => (
          <SealingWaxItem
            key={`${theme.id}-${index}`}
            theme={theme}
            isSelected={theme.sealing_wax_name === selectedTheme?.sealing_wax_name}
            onClick={() => handleSelect(index)}
          />
        ))}
      </CarouselContainer>
    </Wrapper>
  );
};

export default SealingWaxCarousel;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;
