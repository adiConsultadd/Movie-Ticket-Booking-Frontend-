import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if(loading){
    return <div className="flex justify-center items-center min-h-[70vh]">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;