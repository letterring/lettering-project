import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../apis/users';
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

    await signup({
      email: user.email,
      userNickname: user.userNickname,
      password: user.password,
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lettering</h1>

      <KakaoLoginButton />

      <p style={styles.orText}>또는</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="userNickname"
          placeholder="닉네임"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
            required
            style={styles.passwordInput}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            style={styles.eyeIcon}
          />
        </div>

        <div style={styles.passwordContainer}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            onChange={handleChange}
            required
            style={styles.passwordInput}
          />
          <FontAwesomeIcon
            icon={showConfirmPassword ? faEyeSlash : faEye}
            onClick={toggleConfirmPasswordVisibility}
            style={styles.eyeIcon}
          />
        </div>

        <button type="submit" style={styles.signupButton}>
          회원가입
        </button>
      </form>
    </div>
  );
};

//styled 로 수정 예정
const styles = {
  container: {
    backgroundImage: "url('/background/crumbled_paper.png')",
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '0 4rem',
  },
  title: {
    fontFamily: "'Comic Sans MS', cursive",
    fontSize: '2.5rem',
    color: '#a22',
    marginBottom: '20px',
  },
  orText: {
    margin: '15px 0',
    color: '#777',
    fontSize: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '350px',
  },
  input: {
    width: '100%',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '18px',
    boxSizing: 'border-box', // ✅ 패딩이 width에 포함되도록 설정
  },
  passwordContainer: {
    width: '100%', // ✅ 모든 입력 필드와 크기 통일
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
    border: '1px solid #ccc',
    paddingRight: '15px', // ✅ 눈 아이콘 공간 확보
    background: '#fff',
    boxSizing: 'border-box',
    marginBottom: '10px',
  },
  passwordInput: {
    flex: 1,
    padding: '15px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    outline: 'none',
    width: '100%',
  },
  eyeIcon: {
    cursor: 'pointer',
    fontSize: '20px',
    color: '#777',
  },
  signupButton: {
    background: '#C62828',
    color: 'white',
    padding: '15px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default SignUp;
