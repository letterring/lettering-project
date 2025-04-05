import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '../../../apis/user';
import { getUserData } from '../../../apis/user';
import AuthInput from './AuthInput';
import Divider from './Divider';
import KakaoLoginButton from './KakaoLoginButton';
import SubmitButton from './SubmitButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await login({ email, password });

    if (!data) return;

    alert(`로그인 성공! 환영합니다, ${data.userNickname}님!`);
    navigate('/home');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserData();

        if (data) {
          navigate('/home');
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) return null;

  return (
    <StLoginWrapper>
      Lettering
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
          <SubmitButton btnName="로그인" type="submit" />
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
  align-items: center;
  box-sizing: border-box;
  padding: 6rem 2rem;

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
  justify-content: center;
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
