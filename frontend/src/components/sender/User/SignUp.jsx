import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { signup } from '../../../apis/user';
import AuthInput from './AuthInput';
import Divider from './Divider';
import KakaoLoginButton from './KakaoLoginButton';
import SubmitButton from './SubmitButton';

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    userNickname: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await signup({
        email: user.email,
        userNickname: user.userNickname,
        password: user.password,
      });

      if (res && res.data) {
        setError('');
        setUser({
          email: '',
          userNickname: '',
          password: '',
          confirmPassword: '',
        });
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
      }
    } catch (err) {
      console.error('회원가입 실패:', err);

      const errorMessage =
        err.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해주세요.';

      setError(errorMessage);
    }
  };

  return (
    <StSignUpWrapper>
      Lettering
      <ContentWrapper>
        <KakaoLoginButton />
        <Divider text="또는" />
        {error && <ErrorText>{error}</ErrorText>}
        <Form onSubmit={handleSubmit}>
          <AuthInput
            type="email"
            name="email"
            placeholder="이메일"
            value={user.email}
            onChange={handleChange}
            required
          />
          <AuthInput
            type="text"
            name="userNickname"
            placeholder="닉네임"
            value={user.userNickname}
            onChange={handleChange}
            required
          />

          <AuthInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="비밀번호"
            value={user.password}
            onChange={handleChange}
            icon={showPassword ? faEyeSlash : faEye}
            onIconClick={togglePasswordVisibility}
            required
          />

          <AuthInput
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            onChange={handleChange}
            icon={showPassword ? faEyeSlash : faEye}
            onIconClick={toggleConfirmPasswordVisibility}
            required
          />

          <SubmitButton btnName="회원가입" type="submit" />
        </Form>
      </ContentWrapper>
    </StSignUpWrapper>
  );
};

export default SignUp;

const StSignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 4rem;
  padding-top: 6rem;
  box-sizing: border-box;
  height: 100%;

  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.TitleLogo};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding-top: 6rem;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  gap: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.Red1};
  ${({ theme }) => theme.fonts.Body2};
  margin-top: -1rem;
  text-align: center;
`;
