import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '../../apis/user';
import AuthInput from './AuthInput';
import Divider from './Divider';
import KakaoLoginButton from './KakaoLoginButton';
import SubmitButton from './SubmitButton';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      if (res && res.data) {
        setError('');
        alert(`로그인 성공! 환영합니다, ${res.data.userNickname}님!`);

        console.log(res);
        navigate('/Home');
      }
    } catch (err) {
      console.error('로그인 실패!!!:', err);

      const errorMessage =
        err.response?.data?.message || '로그인에 실패하였습니다. 다시 시도해 주세요.';

      console.log('에러 메시지:', errorMessage);

      setError(errorMessage);
    }
  };

  return (
    <StLoginWrapper>
      Lettering
      <ContentWrapper>
        <KakaoLoginButton />
        <Divider text="또는" />
        {error && <ErrorText>{error}</ErrorText>}
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

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.Red1};
  ${({ theme }) => theme.fonts.Body2};
  margin-top: -1rem;
  text-align: center;
`;
