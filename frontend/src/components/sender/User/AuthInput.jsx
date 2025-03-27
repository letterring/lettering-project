import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const AuthInput = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error = '',
  icon,
  onIconClick,
  ...props
}) => {
  return (
    <StInputWrapper>
      <InputBox>
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          {...props}
        />
        {icon && (
          <Icon onClick={onIconClick}>
            <FontAwesomeIcon icon={icon} />
          </Icon>
        )}
      </InputBox>
      {error && <ErrorText>{error}</ErrorText>}
    </StInputWrapper>
  );
};

export default AuthInput;

const StInputWrapper = styled.div`
  width: 28rem;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 4rem;
  box-sizing: border-box;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.White};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 90%;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  background-color: transparent;

  ${({ theme }) => theme.fonts.Body1}

  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.Red2};
  ${({ theme }) => theme.fonts.Body1}
  font-size: 1.4rem;
  margin-top: 0.5rem;
`;

const Icon = styled.div`
  cursor: pointer;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.Gray2};
`;
