import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import MovieList from '../components/movies/MovieList';
import MovieForm from '../components/movies/MovieForm';
import AdminBookingList from './AdminBookingList';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'movies' | 'bookings' | 'addMovie'>('movies');
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !user.is_admin) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <svg className="h-6 w-6 mb-2 sm:mb-0 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium text-base sm:text-lg">Unauthorized: You do not have admin privileges.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-2 sm:mb-0">Admin Dashboard</h1>
        <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-600 text-sm font-medium self-start sm:self-auto">
          Admin Mode
        </div>
      </div>
      
      <div className="mb-6 overflow-x-auto">
        <div className="border-b border-gray-200 min-w-full">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('movies')}
              className={`py-3 px-4 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 ease-in-out flex items-center whitespace-nowrap ${
                activeTab === 'movies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
              </svg>
              <span>Manage Movies</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-3 px-4 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 ease-in-out flex items-center whitespace-nowrap ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <span>View Bookings</span>
            </button>
            <button
              onClick={() => setActiveTab('addMovie')}
              className={`py-3 px-4 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 ease-in-out flex items-center whitespace-nowrap ${
                activeTab === 'addMovie'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <span>Add New Movie</span>
            </button>
          </nav>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-3 sm:p-6 border border-gray-100">
        {activeTab === 'movies' && <MovieList />}
        {activeTab === 'bookings' && <AdminBookingList />}
        {activeTab === 'addMovie' && <MovieForm mode='add'/>}
      </div>
    </div>
  );
};

export default AdminDashboard;