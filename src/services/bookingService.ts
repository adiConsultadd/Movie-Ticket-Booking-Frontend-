import api from './api';
import { Booking, BookingFormData } from '../types/booking';

export const getAllBookings = async (): Promise<Booking[]> => {
  const response = await api.get('/admin/bookings/');
  console.log(response.data)
  return response.data;
};

export const getUserBookings = async (): Promise<Booking[]> => {
  const response = await api.get('/movies/history');
  return response.data;
};

export const bookMovieUser = async (movieId: number, bookingData: BookingFormData): Promise<Booking> => {
  const response = await api.post(`/movies/${movieId}/book/`, {...bookingData});
  console.log(response.data)
  return response.data;
};

export const cancelBookingUser = async (movieId: number): Promise<void> => {
  await api.delete(`/movies/${movieId}/cancel/`);
};

