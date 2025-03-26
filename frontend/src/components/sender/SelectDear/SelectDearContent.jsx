// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';

// // import React from 'react';
// // import Slider from 'react-slick';
// // import styled from 'styled-components';

// // import KeyringImg from '../../../assets/images/keyring.png';

// // const SelectDearContent = ({ keyringArr }) => {
// //   const settings = {
// //     dots: true,
// //     infinite: false,
// //     speed: 500,
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
// //     arrows: false,
// //     centerMode: true,
// //     centerPadding: '15%', // ✅ 카드 간격 조정
// //   };

// //   return (
// //     <StKeyringListWrapper>
// //       <Slider {...settings}>
// //         {keyringArr.map((keyring) => (
// //           <CardWrapper key={keyring.keyringId} isFavorite={keyring.favorite}>
// //             <CardHeader>
// //               <FavoriteMark isFavorite={keyring.favorite}>
// //                 {keyring.favorite ? '❤️' : '🤍'}
// //               </FavoriteMark>
// //               <LastDateText>마지막 편지 3일 전</LastDateText>
// //             </CardHeader>

// //             <KeyringImage src={keyring.imageUrl} alt="키링 이미지" />
// //             <Nickname>{keyring.nfcName}</Nickname>
// //             <TagCode>{keyring.tagCode}</TagCode>
// //           </CardWrapper>
// //         ))}
// //       </Slider>
// //     </StKeyringListWrapper>
// //   );
// // };

// // export default SelectDearContent;

// // const StKeyringListWrapper = styled.div`
// //   width: 100%;
// //   margin: 0 auto;

// //   .slick-list {
// //     overflow: visible;
// //     padding: 0 10px; /* ✅ 패딩 추가 → 카드 간 여백 확보 */
// //   }

// //   .slick-track {
// //     display: flex;
// //     align-items: center;
// //     gap: 20px; /* ✅ 카드 간 간격 수정 */
// //   }

// //   .slick-slide {
// //     display: flex;
// //     justify-content: center;
// //     transition: transform 0.3s ease;
// //   }

// //   /* ✅ 네비게이션 포인트 커스텀 */
// //   .slick-dots li button:before {
// //     color: #d3d3d3;
// //     opacity: 1;
// //   }

// //   .slick-dots li.slick-active button:before {
// //     color: #ff4d4f;
// //   }
// // `;

// // const CardWrapper = styled.div`
// //   width: 240px; /* ✅ 카드 크기 고정 */
// //   height: 300px;
// //   border-radius: 16px; /* ✅ 모서리 둥글게 */
// //   background-color: ${({ theme }) => theme.colors.White};
// //   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
// //   padding: 16px;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: space-between;
// //   align-items: center;
// //   box-sizing: border-box;
// //   transform: scale(${({ isFavorite }) => (isFavorite ? '1.05' : '1')});
// //   transition: transform 0.3s ease;
// // `;

// // const CardHeader = styled.div`
// //   width: 100%;
// //   display: flex;
// //   justify-content: space-between;
// //   align-items: center;
// // `;

// // const FavoriteMark = styled.div`
// //   font-size: 20px;
// //   color: ${({ isFavorite }) => (isFavorite ? '#ff4d4f' : '#d3d3d3')};
// // `;

// // const LastDateText = styled.div`
// //   color: ${({ theme }) => theme.colors.Gray4};
// //   font-size: 12px;
// // `;

// // const KeyringImage = styled.img`
// //   width: 100px;
// //   height: 100px;
// //   object-fit: cover;
// //   border-radius: 12px;
// // `;

// // const Nickname = styled.div`
// //   font-size: 16px;
// //   font-weight: bold;
// //   color: ${({ theme }) => theme.colors.Gray3};
// //   margin-top: 8px;
// // `;

// // const TagCode = styled.div`
// //   font-size: 14px;
// //   color: ${({ theme }) => theme.colors.Gray4};
// //   margin-top: 4px;
// // `;
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import React from 'react';
// import Slider from 'react-slick';
// import styled from 'styled-components';

// const SelectDearContent = ({ keyringArr }) => {
//   const settings = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     centerMode: true,
//     centerPadding: '10%', // ✅ 카드 간격 수정
//   };

//   return (
//     <StKeyringListWrapper>
//       <Slider {...settings}>
//         {keyringArr.map((keyring) => (
//           <CardWrapper key={keyring.keyringId} isFavorite={keyring.favorite}>
//             <CardHeader>
//               <FavoriteMark isFavorite={keyring.favorite}>
//                 {keyring.favorite ? '❤️' : '🤍'}
//               </FavoriteMark>
//               <LastDateText>마지막 편지 3일 전</LastDateText>
//             </CardHeader>

//             {/* ✅ 키링 이미지 */}
//             <CardContent>
//               <KeyringImage src={keyring.imageUrl} alt="키링 이미지" />
//               <Nickname>{keyring.nfcName}</Nickname>
//               <TagCode>{keyring.tagCode}</TagCode>
//             </CardContent>
//           </CardWrapper>
//         ))}
//       </Slider>
//     </StKeyringListWrapper>
//   );
// };

// export default SelectDearContent;

// const StKeyringListWrapper = styled.div`
//   width: 100%;
//   margin: 0 auto;

//   .slick-list {
//     overflow: visible;
//     padding: 0 16px; /* ✅ 패딩 추가 */
//   }

//   .slick-track {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//   }

//   .slick-slide {
//     display: flex;
//     justify-content: center;
//     transition: transform 0.3s ease;
//   }

//   .slick-dots li button:before {
//     color: #d3d3d3;
//     opacity: 1;
//   }

//   .slick-dots li.slick-active button:before {
//     color: #ff4d4f;
//   }
// `;

// const CardWrapper = styled.div`
//   width: 260px; /* ✅ 카드 크기 키우기 */
//   height: 340px; /* ✅ 카드 높이 증가 */
//   border-radius: 16px;
//   background-color: ${({ theme }) => theme.colors.White};
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center; /* ✅ 중앙 정렬 */
//   align-items: center;
//   box-sizing: border-box;
//   transform: scale(${({ isFavorite }) => (isFavorite ? '1.05' : '1')});
//   transition: transform 0.3s ease;
// `;

// const CardHeader = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const FavoriteMark = styled.div`
//   font-size: 20px;
//   color: ${({ isFavorite }) => (isFavorite ? '#ff4d4f' : '#d3d3d3')};
// `;

// const LastDateText = styled.div`
//   color: ${({ theme }) => theme.colors.Gray4};
//   font-size: 12px;
// `;

// /* ✅ 키링 이미지 중앙 정렬 */
// const CardContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center; /* ✅ 수직 중앙 정렬 */
//   height: 100%; /* ✅ 높이 고정 */
// `;

// const KeyringImage = styled.img`
//   width: 120px;
//   height: 120px;
//   object-fit: cover;
//   border-radius: 12px;
//   margin-bottom: 16px; /* ✅ 간격 수정 */
// `;

// const Nickname = styled.div`
//   font-size: 18px;
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.Gray3};
//   margin-bottom: 4px;
// `;

// const TagCode = styled.div`
//   font-size: 14px;
//   color: ${({ theme }) => theme.colors.Gray4};
// `;
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import OptionCard from './OptionCard';

const SelectDearContent = ({ keyringArr }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '5%', // ✅ 여백 좁히기
  };

  return (
    <StKeyringListWrapper>
      <StyledSlider {...settings}>
        {keyringArr.map((keyring) => (
          <OptionCard keyring={keyring} />
        ))}
      </StyledSlider>
    </StKeyringListWrapper>
  );
};

export default SelectDearContent;

const StKeyringListWrapper = styled.div`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  width: 100%;

  .slick-list {
    overflow: hidden;
    height: 100%;
  }

  .slick-track {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// const CardWrapper = styled.div`
//   width: 100%;
//   max-width: 25rem;
//   height: 30rem;
//   border-radius: 16px;
//   background-color: ${({ theme }) => theme.colors.White};
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   box-sizing: border-box;
//   transition: transform 0.3s ease;
// `;

// const CardHeader = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const FavoriteMark = styled.div`
//   font-size: 20px;
//   color: ${({ isFavorite }) => (isFavorite ? '#ff4d4f' : '#d3d3d3')};
// `;

// const CardContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   width: 100%;
// `;

// const KeyringImage = styled.img`
//   width: 120px;
//   height: 120px;
//   object-fit: cover;
//   border-radius: 12px;
//   margin-bottom: 12px;
// `;

// const Nickname = styled.div`
//   font-size: 4rem;
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.Gray3};
//   margin-bottom: 4px;
// `;

// const TagCode = styled.div`
//   font-size: 2rem;
//   color: ${({ theme }) => theme.colors.Gray4};
// `;
