import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser} from '../../services/authService'; 
import { AuthState, LoginCredentials, RegisterCredentials, User } from '../../types/auth';

const token = localStorage.getItem('access_token');
const userString = localStorage.getItem('user');
let user: User | null=null;

if (userString) {
  try {
    user = JSON.parse(userString);
  } catch (e) {
    localStorage.removeItem('user');
  }
}

const initialState: AuthState = {
  user: user,
  access_token: token,
  isAuthenticated: !!token,
  isAdmin: user?.is_admin || false,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const response = await registerUser(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Registration failed' });
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Authentication failed' });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
        logoutUser();
      return null;
    } catch (error: any) {
      return rejectWithValue({ message: 'Logout failed' });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register cases
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.access_token = action.payload.access_token;
        state.user = action.payload.user;
        state.isAuthenticated = false;
        state.isAdmin = action.payload.user?.is_admin || false;
        
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Registration failed';
      });

    // Login cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.access_token = action.payload.access_token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user?.is_admin || false;
        
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Authentication failed';
      });

    // Logout cases
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.access_token = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;