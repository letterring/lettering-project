// import React from 'react';
// import styled, { keyframes } from 'styled-components';

// const floatAnimation = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-5px); }
//   100% { transform: translateY(0px); }
// `;

// const SealingWaxItem = ({ theme, isSelected, onClick }) => {
//   return <Item $backgroundImage={theme.image_url} $isSelected={isSelected} onClick={onClick} />;
// };

// export default SealingWaxItem;

// const Item = styled.div`
//   flex: 0 0 10rem; // ✅ 고정 크기 설정
//   height: 10rem;
//   margin-top: 1rem;
//   background-image: url(${(props) => props.$backgroundImage});
//   background-size: cover;
//   background-position: center;
//   border-radius: 10px;

//   cursor: pointer;
//   transition:
//     transform 0.3s ease,
//     opacity 0.3s ease;

//   // ✅ 선택 상태 강조 효과
//   transform: ${(props) => (props.$isSelected ? 'scale(1.4)' : 'scale(1)')};
//   opacity: ${(props) => (props.$isSelected ? 1 : 0.6)};
//   animation: ${(props) => (props.$isSelected ? floatAnimation : 'none')} 1.5s infinite ease-in-out;

//   // ✅ 마진 적용 → 정렬 깨짐 방지
//   /* margin-top: ${(props) => (props.$isSelected ? '-5px' : '0')}; */
// `;

////////////////////////////////////

/* import React from 'react';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const SealingWaxItem = ({ theme, isSelected, onClick }) => {
  return <Item $backgroundImage={theme.image_url} $isSelected={isSelected} onClick={onClick} />;
};

export default SealingWaxItem;

const Item = styled.div`
  flex: 0 0 10rem;
  height: 10rem;
  margin-top: 1rem;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  // ✅ 선택 상태 강조 효과
  transform: ${(props) => (props.$isSelected ? 'scale(1.4)' : 'scale(1)')};
  opacity: ${(props) => (props.$isSelected ? 1 : 0.6)};
  animation: ${(props) => (props.$isSelected ? floatAnimation : 'none')} 1.5s infinite ease-in-out;
`; */

import React from 'react';
import styled, { keyframes } from 'styled-components';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const SealingWaxItem = ({ theme, isSelected, onClick }) => {
  return <Item $backgroundImage={theme.image_url} $isSelected={isSelected} onClick={onClick} />;
};

export default SealingWaxItem;

const Item = styled.div`
  flex: 0 0 8rem;
  height: 8rem;
  margin-top: 1rem;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  /* transform: ${(props) => (props.$isSelected ? 'scale(1.5)' : 'scale(1)')}; */
  opacity: ${(props) => (props.$isSelected ? 1 : 0.3)};
  animation: ${(props) => (props.$isSelected ? floatAnimation : 'none')} 1.5s infinite ease-in-out;
`;
