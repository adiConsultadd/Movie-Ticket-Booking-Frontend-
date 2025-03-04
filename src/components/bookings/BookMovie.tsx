import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../store/slices/movieSlice';
import { AppDispatch, RootState } from '../../store';
import BookingForm from './BookingForm';
import { showError } from '../../utils/toast';

const BookMovie = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSelectMovie = (movieId: number) => {
    setSelectedMovie(selectedMovie === movieId ? null : movieId);
  };

  useEffect(() => {
    if (error) {
      showError('Failed to load movies.');
    }
  }, [error]);

  const handleBookingSuccess = () => {
    setSelectedMovie(null);
  };

  if (loading && movies.length === 0) {
    return <p className="text-center">Loading movies...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (movies.length === 0) {
    return <p className="text-center text-gray-500">No movies available for booking.</p>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{movie.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">${movie.price}</span>
                <button
                  onClick={() => handleSelectMovie(movie.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {selectedMovie === movie.id ? 'Cancel' : 'Book Now'}
                </button>
              </div>
            </div>

            {selectedMovie === movie.id && (
              <div className="p-4 bg-gray-50 border-t">
                <BookingForm movieId={movie.id} onSuccess={handleBookingSuccess} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMovie;
