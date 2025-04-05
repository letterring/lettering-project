import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { signup } from '../../../apis/user';
import { getUserData } from '../../../apis/user';
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
  const [isLoading, setIsLoading] = useState(true);

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
    <StSignUpWrapper>
      Lettering
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
  width: 100%;
  gap: 1rem;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.Red1};
  ${({ theme }) => theme.fonts.Body2};
  margin-top: -1rem;
  text-align: center;
`;
