import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '../../../apis/user';
import LongButton from '../../common/button/LongButton';
import AuthInput from './AuthInput';
import Divider from './Divider';
import KakaoLoginButton from './KakaoLoginButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await login({ email, password });

    if (!data) return;

    alert(`로그인 성공! 환영합니다, ${data.userNickname}님!`);
    navigate('/Home');
  };

  return (
    <StLoginWrapper>
      <LogoText>Lettering</LogoText>
      <ContentWrapper>
        <KakaoLoginButton />
        <Divider text="또는" />
        <Form onSubmit={handleLogin}>
          <AuthInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AuthInput
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={showPassword ? faEyeSlash : faEye}
            onIconClick={togglePasswordVisibility}
            required
          />
          <LongButton btnName="로그인" type="submit" />
        </Form>
        <SignupText>
          아직 회원이 아니신가요?{' '}
          <SignupLink onClick={() => navigate('/signup')}>회원가입</SignupLink>
        </SignupText>
      </ContentWrapper>
    </StLoginWrapper>
  );
};

export default Login;

const StLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  width: 100%;
  gap: 1rem;
`;

const SignupText = styled.p`
  text-align: center;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.Gray2};
  ${({ theme }) => theme.fonts.Body2}
`;

const SignupLink = styled.span`
  color: ${({ theme }) => theme.colors.Red1};
  ${({ theme }) => theme.fonts.Body1}
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;
