import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllMovies, getMovie, addMovieUser, deleteMovieUser, updateMovieUser} from '../../services/movieService';
import { Movie, MovieFormData } from '../../types/movie'

interface MovieState {
  movies: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  currentMovie: null,
  loading: false,
  error: null,
};


export const fetchMovies = createAsyncThunk(
  'movies/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllMovies();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch movies' });
    }
  }
);

export const fetchMovie = createAsyncThunk(
  'movies/fetchOne',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getMovie(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch movie' });
    }
  }
);

export const addMovie = createAsyncThunk(
  'movies/add',
  async (movieData: MovieFormData, {rejectWithValue}) => {
    try {
      const response = await addMovieUser(movieData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to add movie' });
    }
  }
);

export const updateMovie = createAsyncThunk(
  'movies/update',
  async ({ id, movieData }: { id: number; movieData: MovieFormData }, { rejectWithValue }) => {
    try {
      const response = await updateMovieUser(id, movieData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update movie' });
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteMovieUser(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete movie' });
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovieError: (state) => {
      state.error = null;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Failed to fetch movies';
      });

    builder
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Failed to fetch movie';
      });


    builder
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Failed to add movie';
      });


    builder
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = false;
        const index = state.movies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
        state.currentMovie = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Failed to update movie';
      });


    builder
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.movies = state.movies.filter(movie => movie.id !== action.payload);
        if (state.currentMovie?.id === action.payload) {
          state.currentMovie = null;
        }
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'Failed to delete movie';
      });
  },
});

export const { clearMovieError, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;