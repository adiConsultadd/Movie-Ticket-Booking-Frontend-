import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings, cancelBooking, clearBookingSuccess } from '../../store/slices/bookingSlice';
import { AppDispatch, RootState } from '../../store';
import { showSuccess, showError } from '../../utils/toast';

const UserBookingList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading, error, success } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        showSuccess(success);
        dispatch(clearBookingSuccess());
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      showError('Failed to load bookings.');
    }
  }, [error]);

  const handleCancelBooking = (bookingId: number) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(cancelBooking(bookingId));
    }
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
        <p className="mt-1 text-sm text-gray-500">You haven't booked any movies yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Movie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Showtime</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booked By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.movie_title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.showtime).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.num_seats}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.user_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleCancelBooking(booking.movie_id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBookingList;
