import { styled } from 'styled-components';

const LongButton = ({ btnName, onClick, disabled }) => {
  return (
    <StLongButtonWrapper type="button" onClick={onClick} disabled={disabled}>
      {btnName}
    </StLongButtonWrapper>
  );
};

export default LongButton;

const StLongButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5rem;
  padding: 1rem 2rem;

  border-radius: 1rem;

  background-color: ${({ theme }) => theme.colors.Red2};
  color: white;
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title3};

  &:disabled {
    cursor: none;
    background-color: rgba(212, 177, 177, 0.7);
  }
`;
