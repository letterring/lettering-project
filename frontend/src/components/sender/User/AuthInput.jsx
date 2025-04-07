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
          $hasIcon={!!icon}
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
  width: 100%;
`;

const InputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.Gray5};
  background-color: ${({ theme }) => theme.colors.White};
`;

const StyledInput = styled.input`
  flex: 1;
  display: absolute;
  border: none;
  outline: none;
  background-color: transparent;

  ${({ theme }) => theme.fonts.Body1};

  padding-left: 1.6rem;
  padding-right: ${({ $hasIcon }) => ($hasIcon ? '3.6rem' : '1.6rem')};

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray4};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  display: block;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.Red2};
  ${({ theme }) => theme.fonts.Body2};
`;

const Icon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 1.6rem;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.Gray2};
  flex-shrink: 0;
`;
