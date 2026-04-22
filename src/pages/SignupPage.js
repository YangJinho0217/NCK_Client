import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toast from '../components/Toast';
import './SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const handleSignup = async () => {
    if (!id.trim() || !password || !passwordConfirm) return;

    if (password !== passwordConfirm) {
      showToast('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ loginId: id.trim(), password }),
      });
      const data = await res.json();

      if (data.success) {
        showToast('회원가입이 완료되었습니다!', 'success');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        showToast(data.message);
      }
    } catch (err) {
      showToast('서버 연결에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSignup();
  };

  return (
    <div className="signup-page">
      <div className="signup-bg-overlay" />

      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="signup-container">
        <div className="signup-header">
          <h1 className="signup-title">회원가입</h1>
          <div className="signup-line" />
          <p className="signup-subtitle">NCK Client 계정 생성</p>
        </div>

        <div className="signup-form">
          <div className="signup-input-wrapper">
            <label className="signup-input-label">ID</label>
            <input
              type="text"
              className="signup-input"
              placeholder="사용할 아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="signup-input-wrapper">
            <label className="signup-input-label">PASSWORD</label>
            <input
              type="password"
              className="signup-input"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="signup-input-wrapper">
            <label className="signup-input-label">PASSWORD CONFIRM</label>
            <input
              type="password"
              className="signup-input"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className="signup-btn"
            onClick={handleSignup}
            disabled={loading || !id.trim() || !password || !passwordConfirm}
          >
            <span className="signup-btn-border" />
            <span className="signup-btn-content">
              {loading ? '생성 중...' : '계정 생성'}
            </span>
          </button>

          <div className="signup-footer">
            <span className="signup-footer-text">이미 계정이 있으신가요?</span>
            <Link to="/" className="signup-footer-link">로그인</Link>
          </div>
        </div>
      </div>

      <div className="signup-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="s-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default SignupPage;
