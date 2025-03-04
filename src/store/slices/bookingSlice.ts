import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllBookings, getUserBookings, bookMovieUser, cancelBookingUser } from '../../services/bookingService';
import { Booking, BookingFormData } from '../../types/booking';

interface BookingState {
  bookings: Booking[];
  allBookings: Booking[];
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: BookingState = {
  bookings: [],
  allBookings: [],
  loading: false,
  error: null,
  success: null,
};

export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserBookings();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch bookings' });
    }
  }
);

export const fetchAllBookings = createAsyncThunk(
  'bookings/fetchAllBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllBookings();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch all bookings' });
    }
  }
);

export const bookMovie = createAsyncThunk(
  'bookings/bookMovie',
  async ({ movieId, bookingData }: { movieId: number; bookingData: BookingFormData },{rejectWithValue}) => {
    try {
      const response = await bookMovieUser(movieId, bookingData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to book movie' });
    }
  }
);


export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (movieId: number, { rejectWithValue }) => {
    try {
      await cancelBookingUser(movieId);
      return movieId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to cancel booking' });
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
    clearBookingSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user bookings
    builder
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Failed to fetch bookings';
      });

    // Fetch all bookings (admin)
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.loading = false;
        state.allBookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Failed to fetch all bookings';
      });

    // Book movie
    builder
    .addCase(bookMovie.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(bookMovie.fulfilled, (state, action: PayloadAction<Booking>) => {
      state.loading = false;
      state.bookings.push(action.payload);
      state.success = 'Movie booked successfully!';
    })
    .addCase(bookMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any)?.message || 'Failed to book movie';
    });

    // Cancel booking
    builder
    .addCase(cancelBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    })
    .addCase(cancelBooking.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.bookings = state.bookings.filter(booking => booking.movie_id !== action.payload);
      state.success = 'Booking cancelled successfully!';
    })
    .addCase(cancelBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as any)?.message || 'Failed to cancel booking';
    });
  },
});

export const { clearBookingError, clearBookingSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;