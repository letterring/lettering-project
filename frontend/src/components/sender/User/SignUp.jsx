import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { signup } from '../../../apis/user';
import { getUserData } from '../../../apis/user';
import SuccessBirdImg from '../../../assets/images/bird_hi.png';
import FailBirdImg from '../../../assets/images/bird_sorry.svg';
import LongButton from '../../common/button/LongButton';
import AlertModal from '../../common/modal/AlertModal';
import AuthInput from './AuthInput';
import Divider from './Divider';
import KakaoLoginButton from './KakaoLoginButton';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    image: null,
    onClose: null,
  });
  const [user, setUser] = useState({
    email: '',
    userNickname: '',
    password: '',
    confirmPassword: '',
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

    // 이메일 형식 검증 (간단한 정규표현식 사용)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      showAlert({
        title: '잘못된 이메일 형식',
        message: '유효한 이메일 주소를 입력해주세요.',
        image: FailBirdImg,
      });
      return;
    }

    // 닉네임 검증: 2자 이상 5자 이하
    if (user.userNickname.length < 2 || user.userNickname.length > 5) {
      showAlert({
        title: '닉네임 길이 오류',
        message: '닉네임은 2자 이상 5자 이하로 입력해주세요.',
        image: FailBirdImg,
      });
      return;
    }

    // 비밀번호 길이 검증: 8자 이상 20자 이하
    if (user.password.length < 8 || user.password.length > 20) {
      showAlert({
        title: '비밀번호 길이 오류',
        message: '비밀번호는 8자 이상 20자 이하로 입력해주세요.',
        image: FailBirdImg,
      });
      return;
    }

    // 비밀번호와 비밀번호 확인 일치 여부 검증
    if (user.password !== user.confirmPassword) {
      showAlert({
        title: '비밀번호 불일치',
        message: '비밀번호가 일치하지 않습니다.',
        image: FailBirdImg,
      });
      return;
    }

    // 모든 검증을 통과했다면 회원가입 API 호출
    try {
      await signup({
        email: user.email,
        userNickname: user.userNickname,
        password: user.password,
      });

      setUser({ email: '', userNickname: '', password: '', confirmPassword: '' });

      showAlert({
        title: '회원가입 완료',
        message: '로그인 진행해주세요',
        image: SuccessBirdImg,
        onClose: () => {
          setAlertState((prev) => ({ ...prev, isOpen: false }));
          navigate('/login');
        },
      });
    } catch (err) {
      showAlert({
        title: '회원가입 실패',
        message: err.message,
        image: FailBirdImg,
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserData();

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
      <LogoText>Lettering</LogoText>
      <ContentWrapper>
        <KakaoLoginButton />
        <Divider text="또는" />
        <Form onSubmit={handleSubmit} noValidate>
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
            minLength={8}
            maxLength={20}
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
      <LoginText>
        이미 회원이신가요? <LoginLink onClick={() => navigate('/login')}>로그인</LoginLink>
      </LoginText>
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={alertState.onClose}
        title={alertState.title}
        imgSrc={alertState.image}
      >
        {alertState.message}
      </AlertModal>
    </StSignUpWrapper>
  );
};

export default SignUp;

const StSignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  gap: 1.2rem;
  width: 100%;
  gap: 1rem;
`;

const LoginText = styled.p`
  text-align: center;
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.Gray2};
  ${({ theme }) => theme.fonts.Body2}
`;

const LoginLink = styled.span`
  color: ${({ theme }) => theme.colors.Red1};
  ${({ theme }) => theme.fonts.Body1}
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;
