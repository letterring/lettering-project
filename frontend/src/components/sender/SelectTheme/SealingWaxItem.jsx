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
  margin-top: 2rem;
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
