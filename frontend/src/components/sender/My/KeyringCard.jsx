import React from 'react';
import styled from 'styled-components';

const KeyringCard = () => {
  return <StKeyringCard></StKeyringCard>;
};

export default KeyringCard;

const StKeyringCard = styled.div`
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 1rem;
  width: 18.875rem;
  height: 25.125rem;
`;

const StStar = styled.div``;
