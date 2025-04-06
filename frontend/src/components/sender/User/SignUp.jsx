import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { signup } from '../../../apis/user';
import LongButton from '../../common/button/LongButton';
import AuthInput from './AuthInput';
import Divider from './Divider';
import KakaoLoginButton from './KakaoLoginButton';

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

    const data = await signup({
      email: user.email,
      userNickname: user.userNickname,
      password: user.password,
    });

    if (!data) return;

    setUser({
      email: '',
      userNickname: '',
      password: '',
      confirmPassword: '',
    });
    alert('회원가입이 완료되었습니다!');
    navigate('/login');
  };

  return (
    <StSignUpWrapper>
      <LogoText>Lettering</LogoText>
      <ContentWrapper>
        <KakaoLoginButton />
        <Divider text="또는" />
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

          <LongButton btnName="회원가입" type="submit" />
        </Form>
      </ContentWrapper>
    </StSignUpWrapper>
  );
};

export default SignUp;

const StSignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 2rem;
`;

const LogoText = styled.h1`
  ${({ theme }) => theme.fonts.TitleLogo};
  color: ${({ theme }) => theme.colors.MainRed};
  margin-bottom: 4rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
  max-width: 28rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
`;
