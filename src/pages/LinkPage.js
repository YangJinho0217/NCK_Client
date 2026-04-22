import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import './LinkPage.css';

function LinkPage() {
  const navigate = useNavigate();
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [nickname, setNickname] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const handleLink = async () => {
    if (!nickname.trim() || !tag.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/api/v1/player-setting/set-player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nickname: nickname.trim(), tag: tag.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        showToast('계정 연동이 완료되었습니다!', 'success');
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
    if (e.key === 'Enter') handleLink();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-bg-overlay" />

      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">NCK Client</h1>
          <div className="header-line" />
        </div>

        {!showLinkForm ? (
          <div className="link-section">
            <p className="link-description">라이엇 계정을 연동하여 전적을 확인하세요</p>
            <button
              className="link-btn"
              onClick={() => setShowLinkForm(true)}
            >
              <span className="link-btn-glow" />
              <span className="link-btn-border" />
              <span className="link-btn-content">
                <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                계정 연동하기
              </span>
            </button>
          </div>
        ) : (
          <div className={`form-section ${showLinkForm ? 'form-enter' : ''}`}>
            <p className="form-label">소환사 정보 입력</p>

            <div className="input-group">
              <div className="input-wrapper">
                <label className="input-label">NICKNAME</label>
                <input
                  type="text"
                  className="lol-input"
                  placeholder="소환사명"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>

              <div className="input-divider">
                <span>#</span>
              </div>

              <div className="input-wrapper">
                <label className="input-label">TAG</label>
                <input
                  type="text"
                  className="lol-input"
                  placeholder="KR1"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                className="submit-btn"
                onClick={handleLink}
                disabled={loading || !nickname.trim() || !tag.trim()}
              >
                <span className="submit-btn-border" />
                <span className="submit-btn-content">
                  {loading ? '연동 중...' : '연동하기'}
                </span>
              </button>

              <button
                className="back-btn"
                onClick={() => {
                  setShowLinkForm(false);
                  setNickname('');
                  setTag('');
                }}
              >
                돌아가기
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="d-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 5}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default LinkPage;
