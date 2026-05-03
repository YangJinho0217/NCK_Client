import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearAuth } from '../utils/auth';
import './Sidebar.css';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/', { replace: true });
  };

  return (
    <>
      <button className="hamburger-btn" onClick={() => setOpen(!open)}>
        <div className={`hamburger-icon ${open ? 'open' : ''}`}>
          <span />
          <span />
          <span />
        </div>
      </button>

      <div className={`sidebar-overlay ${open ? 'active' : ''}`} onClick={() => setOpen(false)} />

      <nav className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">NCK</span>
        </div>

        <ul className="sidebar-menu">
          <li>
            <button
              className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
              onClick={() => handleNavigate('/dashboard')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              대시보드
            </button>
          </li>
          <li>
            <button
              className={`sidebar-item ${location.pathname === '/users' ? 'active' : ''}`}
              onClick={() => handleNavigate('/users')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              유저 목록
            </button>
          </li>
        </ul>

        <div className="sidebar-footer">
          <button className="sidebar-item logout" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            로그아웃
          </button>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
