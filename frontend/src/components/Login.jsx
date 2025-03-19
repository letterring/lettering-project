import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../apis/users';
import KakaoLoginButton from '../components/KakaoLoginButton';

const Login = ({ onLoginSuccess }) => {
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

    const res = await login({ email, password });

    console.log(res);

    alert(`로그인 성공! 환영합니다, ${res.userNickname}님!`);
    onLoginSuccess();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lettering</h1>

      <KakaoLoginButton />
      <p style={styles.orText}>또는</p>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleLogin} style={styles.form}>
        {/* ✅ 이메일 입력 필드 */}
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        {/* ✅ 비밀번호 입력 필드 (이메일 입력 필드와 크기 맞춤) */}
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.passwordInput}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            style={styles.eyeIcon}
          />
        </div>

        <button type="submit" style={styles.loginButton}>
          로그인
        </button>
      </form>

      <p style={styles.signupText}>
        아직 회원이 아니신가요?{' '}
        <span style={styles.signupLink} onClick={() => navigate('/signup')}>
          회원가입
        </span>
      </p>
    </div>
  );
};

// ✅ 스타일 수정 (이메일 & 비밀번호 입력칸 크기 맞춤)
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
    width: '100%', // ✅ 이메일 입력 필드와 동일한 크기 적용
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
  loginButton: {
    background: '#C62828',
    color: 'white',
    padding: '15px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  signupText: {
    marginTop: '15px',
    color: '#555',
    fontSize: '16px',
  },
  signupLink: {
    color: '#C62828',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '16px',
  },
};

export default Login;
