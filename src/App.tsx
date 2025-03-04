import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import HomePage from "./pages/HomePage";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import NotFound from "./components/auth/NotFound";
import Layout from "./components/layout/Layout";
import MovieDetailPage from './pages/MovieDetailPage';
import BookingHistory from './pages/BookingHistory';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

// Redux
import { RootState } from './store/index';
import MovieEditPage from './pages/MovieEditPage';

function App() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Layout>
        <Routes>
          {/* Redirect logged-in users to respective dashboards */}
          <Route path="/" element={
            isAuthenticated 
              ? user?.is_admin 
                ? <Navigate to="/admin" />
                : <Navigate to="/dashboard" />
              : <HomePage />
          } />

          <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" />} />
          
          {/* User Dashboard (Protected Route) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }/>

          {/* Protected Routes - Require Authentication */}
          <Route path="/booking-history" element={
            <ProtectedRoute>
              <BookingHistory />
            </ProtectedRoute>
          } />

          <Route path="/movies/:id" element={
            <ProtectedRoute>
              <MovieDetailPage />
            </ProtectedRoute>
          } />

          <Route path="/admin/movies/edit/:id" element={
            <ProtectedRoute>
              <MovieEditPage/>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-right" />
      </Layout>
    </>
  );
}

export default App;
