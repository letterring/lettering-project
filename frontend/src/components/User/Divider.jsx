import React from 'react';
import styled from 'styled-components';

const Divider = ({ text }) => {
  return (
    <StDividerWrapper>
      <Line />
      <Text>{text}</Text>
      <Line />
    </StDividerWrapper>
  );
};

export default Divider;

const StDividerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin: 1rem 0;

  width: 100%;
`;

const Line = styled.div`
  flex: 1;
  height: 0.1rem;
  background-color: ${({ theme }) => theme.colors.Gray3};
`;

const Text = styled.span`
  padding: 0 1rem;
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Title5}
`;
