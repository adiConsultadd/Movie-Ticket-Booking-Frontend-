import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, clearError } from '../../store/slices/authSlice';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Alert from '../ui/Alert';
import { showError } from '../../utils/toast';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="flex justify-center align-middle">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-900">Welcome Back</h1>
        <p className="text-center text-gray-700">Sign in to your account</p>
        {error && <Alert type="error" message={error} onClose={() => dispatch(clearError())} />}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Username" name="username" type="text" value={formData.username} required onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Input label="Password" name="password" type="password" value={formData.password} required onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <Button type="submit" fullWidth isLoading={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </Button>
        </form>
        <div className="text-center text-gray-700">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
        </div>
      </div>    
    </div>
  );
};

export default LoginForm;
