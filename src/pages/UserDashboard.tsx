import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import UserBookingList from '../components/bookings/UserBookingList';
import BookMovie from '../components/bookings/BookMovie';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState<'bookMovie' | 'myBookings'>('bookMovie');
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <svg className="h-6 w-6 mb-2 sm:mb-0 sm:mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="font-medium text-base sm:text-lg">Please log in to access your dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-2 sm:mb-0">My Dashboard</h1>
        <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-600 text-sm font-medium self-start sm:self-auto">
          Welcome, {user?.username || "Guest"}
        </div>
      </div>
      
      <div className="mb-6 overflow-x-auto">
        <div className="border-b border-gray-200 min-w-full">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('bookMovie')}
              className={`py-3 px-4 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 ease-in-out flex items-center whitespace-nowrap ${
                activeTab === 'bookMovie'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🎬 Book Movie Tickets
            </button>
            <button
              onClick={() => setActiveTab('myBookings')}
              className={`py-3 px-4 sm:px-6 text-center border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 ease-in-out flex items-center whitespace-nowrap ${
                activeTab === 'myBookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📋 My Bookings
            </button>
          </nav>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-3 sm:p-6 border border-gray-100">
        {activeTab === 'bookMovie' && <BookMovie />}
        {activeTab === 'myBookings' && <UserBookingList />}
      </div>
    </div>
  );
};

export default UserDashboard;
