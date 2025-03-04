  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAppDispatch, useAppSelector } from '../../hooks/redux';
  import { register, clearError } from '../../store/slices/authSlice';
  import Button from '../ui/Button';
  import Input from '../ui/Input';
  import Alert from '../ui/Alert';
  import { showError } from '../../utils/toast';

  const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      is_admin: false,
    });

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
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(register(formData));
      navigate('/login');
    };

    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h1 className="text-4xl font-bold text-center text-gray-900">Register</h1>
          <p className="text-center text-gray-700">Create a new account</p>
          <form onSubmit={handleSubmit} className="">
            {error && (
              <Alert type="error" message={error} onClose={() => dispatch(clearError())}/>
            )}

            <div>
              <Input label="Username" name="username" type="text" required
                value={formData.username} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <Input label="Password" name="password" type="password" required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" name="is_admin" checked={formData.is_admin} onChange={handleChange} className="mr-2"/>
              <label className="text-gray-700">Register as Admin</label>
            </div>

            <div>
              <Button type="submit" fullWidth isLoading={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                Register
              </Button>
            </div>
          </form>
          <div className="text-center text-gray-700">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
          </div>
        </div>
      </div>
    );
  };

  export default RegisterForm;
