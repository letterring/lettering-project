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
  height: 4rem;
  margin-top: 2rem;
  box-sizing: border-box;

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
