import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LinkPage from './pages/LinkPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/link" element={<LinkPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;

// 대시보드 화면에서, 이동필요