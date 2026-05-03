import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LinkPage from './pages/LinkPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';

function AppContent() {
  const location = useLocation();
  const publicPaths = ['/', '/signup'];
  const showSidebar = !publicPaths.includes(location.pathname);

  return (
    <>
      {showSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="/link" element={<LinkPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
