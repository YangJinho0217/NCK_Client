import React from 'react';
import './DashboardPage.css';

function DashboardPage() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-bg-overlay" />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">NCK Client</h1>
          <div className="header-line" />
        </div>

        <div className="dashboard-content">
          <p className="dashboard-welcome">계정 연동이 완료되었습니다</p>
        </div>
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

export default DashboardPage;
