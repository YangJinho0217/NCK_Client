import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Toast from '../components/Toast';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const handleLogin = async () => {
    if (!id.trim() || !password.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/v1/player-setting/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ loginId: id.trim(), password }),
      });
      const data = await res.json();

      if (data.success) {
        const playerRes = await fetch('http://localhost:3000/api/v1/player-setting/player', {
          method: 'GET',
          credentials: 'include',
        });
        const playerData = await playerRes.json();

        if (playerData.success) {
          navigate('/link');
        } else {
          navigate('/dashboard');
        }
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
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay" />

      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="login-container">
        <div className="login-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 5L90 25V75L50 95L10 75V25L50 5Z" stroke="#c89b3c" strokeWidth="2" fill="none" />
              <path d="M50 15L80 30V70L50 85L20 70V30L50 15Z" stroke="#c89b3c" strokeWidth="1" fill="rgba(200,155,60,0.05)" />
              <text x="50" y="58" textAnchor="middle" fill="#f0e6d2" fontSize="24" fontWeight="bold">NCK</text>
            </svg>
          </div>
          <h1 className="login-title">NCK Client</h1>
          <p className="login-subtitle">소환사 전적 검색 시스템</p>
        </div>

        <div className="login-form">
          <div className="login-input-wrapper">
            <label className="login-input-label">ID</label>
            <input
              type="text"
              className="login-input"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="login-input-wrapper">
            <label className="login-input-label">PASSWORD</label>
            <input
              type="password"
              className="login-input"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading || !id.trim() || !password.trim()}
          >
            <span className="btn-border" />
            <span className="btn-content">{loading ? '접속 중...' : '로그인'}</span>
          </button>

          <div className="login-footer">
            <span className="login-footer-text">계정이 없으신가요?</span>
            <Link to="/signup" className="login-footer-link">회원가입</Link>
          </div>
        </div>
      </div>

      <div className="login-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default LoginPage;
