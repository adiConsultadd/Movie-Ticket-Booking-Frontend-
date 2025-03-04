import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);

  if(loading) {
    return <div className="flex justify-center items-center min-h-[70vh]">Loading...</div>;
  }

  if(!isAuthenticated){
    return <Navigate to="/login" />;
  }

  if(!user?.is_admin){
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;