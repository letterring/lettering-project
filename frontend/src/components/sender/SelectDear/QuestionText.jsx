// import React from 'react';
// import styled from 'styled-components';

// import MailboxIcon from '../../../assets/images/sender/NormalOption.png';

// const QuestionText = () => {
//   return (
//     <Wrapper>
//       <IconWrapper>
//         <Icon src={MailboxIcon} alt="편지 아이콘" />
//       </IconWrapper>
//       <Text>누구에게 보내는 편지인가요?</Text>
//     </Wrapper>
//   );
// };

// export default QuestionText;

// const Wrapper = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: white;
//   padding: 0.5rem 2rem 0.5rem 2rem;
//   border-radius: 2rem;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//   margin-bottom: 2rem;
// `;
// const IconWrapper = styled.div`
//   width: 1.8rem;
//   left: -1.5rem;
//   height: 1.8rem;
//   margin-right: 0.5rem;
//   flex-shrink: 0;
//   position: relative;
// `;

// const Icon = styled.img`
//   position: absolute;
//   width: 5rem;
//   height: 5rem;
//   top: -1.8rem;
//   left: -1.5rem;
// `;

// const Text = styled.span`
//   font-size: 0.95rem;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.Primary};
// `;
import React from 'react';
import styled from 'styled-components';

import MailboxIcon from '../../../assets/images/sender/NormalOption.png';

const QuestionText = () => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon src={MailboxIcon} alt="편지 아이콘" />
      </IconWrapper>
      <Text>누구에게 보내는 편지인가요?</Text>
    </Wrapper>
  );
};

export default QuestionText;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 1rem 2rem 0.5rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  width: 2rem;
  left: -1.5rem;
  height: 2rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
  position: relative;
`;

const Icon = styled.img`
  position: absolute;
  width: 6rem;
  height: 6rem;
  top: -2.5rem;
  left: -2rem;
`;

const Text = styled.span`
  font-size: 0.5rem;
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Saeum3};
`;
