import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookMovie } from '../../store/slices/bookingSlice';
import { AppDispatch, RootState } from '../../store';
import { BookingFormData } from '../../types/booking';
import { showSuccess, showError } from '../../utils/toast';

interface BookingFormProps {
  movieId: number;
  onSuccess?: () => void;
}

const BookingForm = ({ movieId, onSuccess }: BookingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.bookings);
  
  const [formData, setFormData] = useState<BookingFormData>({
    num_seats: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'seats' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(bookMovie({ movieId, bookingData: formData })).unwrap();
      // showSuccess('Booking successful!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      showError('Booking failed.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>
        
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Seats
          </label>
          <input
            type="number"
            id="seats"
            name="num_seats"
            min="1"
            max="10"
            value={formData.num_seats}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;