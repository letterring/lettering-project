import { styled } from 'styled-components';

const SubmitButton = ({ btnName, onClick, disabled, type }) => {
  return (
    <StLongButtonWrapper type={type} onClick={onClick} disabled={disabled}>
      {btnName}
    </StLongButtonWrapper>
  );
};

export default SubmitButton;

const StLongButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28rem;
  height: 5rem;
  padding: 1rem 2rem;
  margin-top: 2rem;

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
