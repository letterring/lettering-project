import { styled } from 'styled-components';

const LongButton = ({ btnName, onClick, disabled, variant = 'default', type = 'button' }) => {
  return (
    <StLongButtonWrapper type={type} onClick={onClick} disabled={disabled} $variant={variant}>
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
  max-width: 30rem;
  height: 5rem;
  padding: 1rem 2rem;

  border-radius: 1rem;

  ${({ theme }) => theme.fonts.Title3};

  ${({ theme, $variant }) => {
    switch ($variant) {
      case 'cancel':
        return `
          background-color: ${theme.colors.White};
          color: ${theme.colors.Gray3};
          border: 1px solid ${theme.colors.Gray4};
        `;
      case 'kakao':
        return `
        background-color: ${theme.colors.KakaoBG};
        color: ${theme.colors.Gray1};
      `;
      default:
        return `
          background-color: ${theme.colors.Red2};
          color: ${theme.colors.White};
        `;
    }
  }}

  &:disabled {
    cursor: none;
    background-color: rgba(212, 177, 177, 0.7);
  }
`;
