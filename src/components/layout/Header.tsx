import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/slices/authSlice';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-700">Movix</span>
            </Link>
          </div>

          {/* Logout button (shown only when authenticated) */}
          {isAuthenticated && (
            <div className="flex items-center">
              <span className="text-gray-600 mr-3 hidden sm:inline">
                Hi, {user?.username || 'User'}
              </span>
              <Button 
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;