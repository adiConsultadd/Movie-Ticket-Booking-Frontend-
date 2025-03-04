export interface User {
  id: number;
  username: string;
  is_admin: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  token_type: string;
  user: User;
}

  
export interface RegisterCredentials {
  username: string;
  password: string;
  is_admin: boolean;
}

export interface AuthState {
  user: User | null;
  access_token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}