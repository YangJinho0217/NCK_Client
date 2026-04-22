import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/cookie';

function PublicRoute({ children }) {
  if (isLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export default PublicRoute;
