import api from './api';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const formData = new URLSearchParams()
  formData.append("username",credentials.username)
  formData.append("password",credentials.password)
  const response = await api.post('/auth/login/', formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  console.log(response.data)
  return response.data;
};

export const registerUser = async (userData: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post('/auth/register/', userData);
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
};