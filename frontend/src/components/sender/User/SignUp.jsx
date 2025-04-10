import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { signup } from '../../../apis/user';
import SuccessBirdImg from '../../../assets/images/bird_hi.png';
import FailBirdImg from '../../../assets/images/bird_sorry.svg';
import LongButton from '../../common/button/LongButton';
import AlertModal from '../../common/modal/AlertModal';
import AuthInput from './AuthInput';
import Divider from './Divider';
import KakaoLoginButton from './KakaoLoginButton';

const SignUp = () => {
  const navigate = useNavigate();
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

    if (user.password !== user.confirmPassword) {
      showAlert({
        title: '비밀번호 불일치',
        message: '비밀번호가 일치하지 않습니다.',
        image: FailBirdImg,
      });
      return;
    }

    try {
      const data = await signup({
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
