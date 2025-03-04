import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchMovies } from '../../store/slices/movieSlice';
import MovieCard from './MovieCard';
import Loader from '../ui/Loader';
import Alert from '../ui/Alert';

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movies);
  
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);


  if (loading && movies.length === 0) {
    return <Loader />;
  }
  
  if (error) {
    return <Alert type="error" message={error} />;
  }
  
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center px-4">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
        </svg>
        <p className="text-gray-500 text-base sm:text-lg font-medium">No movies available</p>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">Check back later or add a new movie!</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-0">All Movies ({movies.length})</h2>
        <div className="text-xs sm:text-sm text-gray-500">Showing all movies</div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.title}-${index}`} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;