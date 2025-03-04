import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserBookings, clearBookingSuccess, clearBookingError } from '../../store/slices/bookingSlice';
import BookingCard from './BookingCard';
import Loader from '../ui/Loader';
import Alert from '../ui/Alert';

const BookingList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading, error, success } = useAppSelector((state) => state.bookings);
  
  useEffect(() => {
    dispatch(fetchUserBookings());
    
    return () => {
      dispatch(clearBookingSuccess());
      dispatch(clearBookingError());
    };
  }, [dispatch]);
  
  if (loading && bookings.length === 0) {
    return <Loader />;
  }
  
  return (
    <div className="space-y-6">
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => dispatch(clearBookingError())}
        />
      )}
      
      {success && (
        <Alert
          type="success"
          message={success}
          onClose={() => dispatch(clearBookingSuccess())}
        />
      )}
      
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You don't have any bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;