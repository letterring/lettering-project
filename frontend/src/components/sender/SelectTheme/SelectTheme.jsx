// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// import SealingWaxCarousel from './SealingWaxCarousel';

// const SelectTheme = () => {
//   const [selectedTheme, setSelectedTheme] = useState(null);

//   // ✅ 로컬 스토리지에서 sealingWaxName 값 가져오기 → 없으면 2번 자동 선택
//   useEffect(() => {
//     const storedThemeName = localStorage.getItem('sealingWaxName');
//     const mockData = [
//       { id: 1, sealing_wax_name: 'Happy Birthday', image_url: '/temp-images/1.png' },
//       { id: 2, sealing_wax_name: 'Love Letter', image_url: '/temp-images/2.png' },
//       { id: 3, sealing_wax_name: 'Special Day', image_url: '/temp-images/3.png' },
//       { id: 4, sealing_wax_name: 'Thank You', image_url: '/temp-images/4.png' },
//       { id: 5, sealing_wax_name: 'Congratulations', image_url: '/temp-images/5.png' },
//     ];

//     if (storedThemeName) {
//       const storedTheme = mockData.find((theme) => theme.sealing_wax_name === storedThemeName);
//       setSelectedTheme(storedTheme);
//     } else {
//       setSelectedTheme(mockData[1]); // ✅ 없으면 2번 테마 자동 선택
//     }
//   }, []);

//   const handleSelectTheme = (theme) => {
//     setSelectedTheme(theme);
//   };

//   const handleConfirm = () => {
//     if (selectedTheme) {
//       localStorage.setItem('sealingWaxName', selectedTheme.sealing_wax_name);
//       console.log(`${selectedTheme.sealing_wax_name} 테마가 저장되었습니다!`);
//     } else {
//       alert('테마를 선택해주세요!');
//     }
//   };

//   return (
//     <Wrapper>
//       <Title>디자인 선택</Title>

//       <SealingWaxCarousel onSelect={handleSelectTheme} selectedTheme={selectedTheme} />

//       {/* ✅ 실링왁스 이름 위치 조정 */}
//       {selectedTheme && <SelectedThemeName>{selectedTheme.sealing_wax_name}</SelectedThemeName>}

//       {/* ✅ 선택한 실링왁스 예시 이미지 */}
//       {selectedTheme && <ExampleImage src={`/temp-images/${selectedTheme.id + 10}.png`} />}

//       <ConfirmButton onClick={handleConfirm} disabled={!selectedTheme}>
//         지금 디자인으로 편지쓰기
//       </ConfirmButton>
//     </Wrapper>
//   );
// };

// export default SelectTheme;

// const Wrapper = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
//   align-items: center;
// `;

// const Title = styled.h1`
//   text-align: center;
//   color: #b13f3e;
// `;

// const SelectedThemeName = styled.div`
//   text-align: center;
//   font-size: 18px;
//   color: #b13f3e;
//   font-weight: bold;
// `;

// const ExampleImage = styled.img`
//   width: 100%;
//   height: auto;
//   border-radius: 10px;
//   margin-top: 8px;
// `;

// const ConfirmButton = styled.button`
//   padding: 12px;
//   background-color: #b13f3e;
//   color: #fff;
//   border-radius: 5px;
//   cursor: pointer;
//   width: 100%;
//   margin-top: 16px;
//   font-size: 16px;
//   transition: background-color 0.2s ease;

//   &:disabled {
//     background-color: #ccc;
//     cursor: not-allowed;
//   }
// `;
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SealingWaxCarousel from './SealingWaxCarousel';

const SelectTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    const storedThemeName = localStorage.getItem('sealingWaxName');
    const mockData = [
      { id: 1, sealing_wax_name: 'Happy Birthday', image_url: '/temp-images/1.png' },
      { id: 2, sealing_wax_name: 'Love Letter', image_url: '/temp-images/2.png' },
      { id: 3, sealing_wax_name: 'Special Day', image_url: '/temp-images/3.png' },
      { id: 4, sealing_wax_name: 'Thank You', image_url: '/temp-images/4.png' },
      { id: 5, sealing_wax_name: 'Congratulations', image_url: '/temp-images/5.png' },
    ];

    if (storedThemeName) {
      const storedTheme = mockData.find((theme) => theme.sealing_wax_name === storedThemeName);
      setSelectedTheme(storedTheme || mockData[0]); // ✅ 첫 번째 실링왁스를 기본값으로 설정
    } else {
      setSelectedTheme(mockData[0]); // ✅ 첫 번째 실링왁스를 기본값으로 설정
    }
  }, []);

  const handleSelectTheme = (theme) => {
    setSelectedTheme(theme);
  };

  const handleConfirm = () => {
    if (selectedTheme) {
      localStorage.setItem('sealingWaxName', selectedTheme.sealing_wax_name);
      console.log(`${selectedTheme.sealing_wax_name} 테마가 저장되었습니다!`);
    } else {
      alert('테마를 선택해주세요!');
    }
  };

  return (
    <Wrapper>
      <Title>디자인 선택</Title>

      <SealingWaxCarousel onSelect={handleSelectTheme} selectedTheme={selectedTheme} />

      {/* ✅ 실링왁스 이름 */}
      {selectedTheme && <SelectedThemeName>{selectedTheme.sealing_wax_name}</SelectedThemeName>}

      {/* ✅ 선택한 실링왁스에 대한 예시 이미지 */}
      {selectedTheme && <ExampleImage src={`/temp-images/${selectedTheme.id + 10}.png`} />}

      <ConfirmButton onClick={handleConfirm} disabled={!selectedTheme}>
        지금 디자인으로 편지쓰기
      </ConfirmButton>
    </Wrapper>
  );
};

export default SelectTheme;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  color: #b13f3e;
`;

const SelectedThemeName = styled.div`
  text-align: center;
  font-size: 18px;
  color: #b13f3e;
  font-weight: bold;
`;

const ExampleImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 8px;
`;

const ConfirmButton = styled.button`
  padding: 12px;
  background-color: #b13f3e;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
