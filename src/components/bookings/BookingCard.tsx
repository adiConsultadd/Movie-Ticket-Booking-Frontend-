import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { cancelBooking } from "../../store/slices/bookingSlice";
import { Booking } from "../../types/booking";
import { showSuccess, showError } from "../../utils/toast";

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const dispatch = useAppDispatch();

  const handleCancel = async () => {
    try {
      await dispatch(cancelBooking(booking.id));
      showSuccess('Booking cancelled successfully!');
    } catch (error) {
      showError('Failed to cancel booking.');
    }
  };

  return (
    <div className="shadow-lg p-4 rounded-2xl border bg-white">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{booking.movie_title}</h2>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600">Date: {booking.showtime}</p>
        <p className="text-gray-600">Seats: {booking.num_seats}</p>
        <button
          className="w-full mt-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          onClick={handleCancel}
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default BookingCard;