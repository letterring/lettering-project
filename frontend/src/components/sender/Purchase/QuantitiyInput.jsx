import React, { useState } from 'react';
import styled from 'styled-components';

import { IcMinus, IcPlus } from '../../../assets/icons';

const QuantityInput = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Container>
      <Button onClick={decrement}>
        <IcMinus />
      </Button>
      <QuantityDisplay>{quantity}</QuantityDisplay>
      <Button onClick={increment}>
        <IcPlus />
      </Button>
    </Container>
  );
};

export default QuantityInput;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 14rem;
  height: 5rem;

  background: ${({ theme }) => theme.colors.Background};
  border-radius: 1.5rem;

  user-select: none;
`;

const Button = styled.button`
  font-size: 20px;
  color: black;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;

const QuantityDisplay = styled.div`
  width: 5rem;
  height: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(196, 196, 196, 0.1);
  ${({ theme }) => theme.fonts.Title2};
  border-radius: 5rem;
`;
