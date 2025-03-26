// // src/components/sender/DeliveryType/DeliveryTypeCard.jsx
// import React from 'react';
// import styled from 'styled-components';

// const DeliveryTypeCard = ({ icon, title, description, onClick }) => {
//   return (
//     <Card onClick={onClick}>
//       <Icon src={icon} alt={title} />
//       <TextBox>
//         <Title>{title}</Title>
//         <Description>{description}</Description>
//       </TextBox>
//     </Card>
//   );
// };

// export default DeliveryTypeCard;

// const Card = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1.2rem;
//   background-color: white;
//   padding: 1.2rem 1.6rem;
//   border-radius: 1.2rem;
//   box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.05);
//   cursor: pointer;
//   transition: transform 0.2s ease;

//   &:hover {
//     transform: translateY(-3px);
//   }
// `;

// const Icon = styled.img`
//   width: 3rem;
//   height: 3rem;
// `;

// const TextBox = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Title = styled.div`
//   font-weight: bold;
//   font-size: 1.4rem;
// `;

// const Description = styled.div`
//   font-size: 1.2rem;
//   color: gray;
// `;
// src/components/sender/DeliveryType/DeliveryTypeCard.jsx
// src/components/sender/DeliveryType/DeliveryTypeCard.jsx
import React from 'react';
import styled from 'styled-components';

const DeliveryTypeCard = ({ icon, title, description, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Icon src={icon} alt={title} />
      <TextBox>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextBox>
    </Card>
  );
};

export default DeliveryTypeCard;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background-color: white;
  padding: 1.5rem 1.5rem;
  border-radius: 1.2rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease;
  height: 6.5rem;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Icon = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  flex-shrink: 0;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.Gray1};
  ${({ theme }) => theme.fonts.Saeum2};
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Body2};
`;
