import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { login } from '../../../apis/user';
import FailBirdImg from '../../../assets/images/bird_sorry.svg';
import LongButton from '../../common/button/LongButton';
import AlertModal from '../../common/modal/AlertModal';
import AuthInput from './AuthInput';
import Divider from './Divider';
import KakaoLoginButton from './KakaoLoginButton';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    image: null,
    onClose: null,
  });

  const showAlert = ({ title, message, onClose, image }) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      image,
      onClose: onClose || (() => setAlertState((prev) => ({ ...prev, isOpen: false }))),
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 커스텀 검증: 이메일 형식 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert({
        title: '잘못된 이메일 형식',
        message: '유효한 이메일 주소를 입력해주세요.',
        image: FailBirdImg,
      });
      return;
    }

    // 커스텀 검증: 비밀번호 길이 체크 (8자 이상 20자 이하)
    if (password.length < 8 || password.length > 20) {
      showAlert({
        title: '비밀번호 길이 오류',
        message: '비밀번호는 8자 이상 20자 이하로 입력해주세요.',
        image: FailBirdImg,
      });
      return;
    }

    try {
      const data = await login({ email, password });

      setEmail('');
      setPassword('');

      navigate('/home');
    } catch (err) {
      showAlert({
        title: '로그인 실패',
        message: err.message,
        image: FailBirdImg,
      });
    }
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
      <LogoText>Lettering</LogoText>
      <ContentWrapper>
        <KakaoLoginButton />
        <Divider text="또는" />
        <Form onSubmit={handleLogin} noValidate>
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
            minLength={8}
            maxLength={20}
          />
          <LongButton btnName="로그인" type="submit" />
        </Form>
        <SignupText>
          아직 회원이 아니신가요?{' '}
          <SignupLink onClick={() => navigate('/signup')}>회원가입</SignupLink>
        </SignupText>
      </ContentWrapper>
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={alertState.onClose}
        title={alertState.title}
        imgSrc={alertState.image}
      >
        {alertState.message}
      </AlertModal>
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
  box-sizing: border-box;
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
