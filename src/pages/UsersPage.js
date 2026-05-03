import React, { useState, useEffect, useCallback } from 'react';
import Toast from '../components/Toast';
import './UsersPage.css';

function UsersPage() {
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'error') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(players);
    } else {
      const keyword = search.trim().toLowerCase();
      setFiltered(
        players.filter(
          (p) =>
            p.gameNickName?.toLowerCase().includes(keyword) ||
            p.gameTag?.toLowerCase().includes(keyword)
        )
      );
    }
  }, [search, players]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/v1/user-players', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success) {
        setPlayers(data.data || []);
      } else {
        showToast(data.message);
      }
    } catch (err) {
      showToast('서버 연결에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getTierColor = (tier) => {
    const colors = {
      'IRON': '#5e5e5e',
      'BRONZE': '#8c5a2e',
      'SILVER': '#7b8fa2',
      'GOLD': '#c89b3c',
      'PLATINUM': '#2d9e8f',
      'EMERALD': '#1ba373',
      'DIAMOND': '#576bce',
      'MASTER': '#9d48e0',
      'GRANDMASTER': '#e34343',
      'CHALLENGER': '#f4c874',
    };
    return colors[tier?.toUpperCase()] || '#5b5a56';
  };

  return (
    <div className="users-page">
      <div className="users-bg-overlay" />

      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="users-container">
        <div className="users-header">
          <h1 className="users-title">플레이어 목록</h1>
          <div className="users-line" />
        </div>

        <div className="users-toolbar">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="소환사명 또는 태그로 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>
                ✕
              </button>
            )}
          </div>
          <div className="toolbar-right">
            <span className="users-count">{filtered.length}명</span>
            <button className="refresh-btn" onClick={fetchPlayers} disabled={loading}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23,4 23,10 17,10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
          </div>
        </div>

        <div className="users-table-wrapper">
          {loading ? (
            <div className="users-loading">
              <div className="loading-spinner" />
              <span>불러오는 중...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="users-empty">
              <p>{search ? '검색 결과가 없습니다' : '등록된 플레이어가 없습니다'}</p>
            </div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th className="th-id">ID</th>
                  <th className="th-nickname">소환사명</th>
                  <th className="th-tag">태그</th>
                  <th className="th-tier">티어</th>
                  <th className="th-rank">랭크</th>
                  <th className="th-status">상태</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((player, index) => (
                  <tr key={player.id || index} className="user-row">
                    <td className="td-id">{player.id}</td>
                    <td className="td-nickname">{player.gameNickName}</td>
                    <td className="td-tag">#{player.gameTag}</td>
                    <td className="td-tier">
                      <span
                        className="tier-badge"
                        style={{ color: getTierColor(player.tier), borderColor: getTierColor(player.tier) }}
                      >
                        {player.tier || '-'}
                      </span>
                    </td>
                    <td className="td-rank">{player.rank || '-'}</td>
                    <td className="td-status">
                      <span className={`status-dot ${player.player?.isActive ? 'active' : 'inactive'}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="users-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="u-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 5}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
