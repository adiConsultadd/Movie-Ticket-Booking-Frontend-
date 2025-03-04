import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchMovie } from '../store/slices/movieSlice';
import MovieForm from '../components/movies/MovieForm';
import { showError } from '../utils/toast';

const MovieEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentMovie, loading } = useAppSelector((state) => state.movies);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      dispatch(fetchMovie(parseInt(id))).then(() => setIsLoading(false)).catch(() => {
        showError('Failed to load movie details.');
        setIsLoading(false);
      });
    }
  }, [dispatch, id]);

  if (isLoading || loading) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-4xl">
        <div className="flex items-center justify-center h-40 md:h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-12 w-12 md:h-16 md:w-16 mb-3 md:mb-4"></div>
            <div className="h-3 md:h-4 bg-gray-200 rounded w-36 md:w-48 mb-2"></div>
            <div className="h-2 md:h-3 bg-gray-200 rounded w-24 md:w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentMovie) {
    return (
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12 max-w-4xl">
        <div className="bg-red-50 border-l-4 border-red-400 p-3 md:p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Movie not found. The movie may have been deleted.
              </p>
              <div className="mt-3 md:mt-4">
                <Link to="/admin" className="text-sm font-medium text-red-700 hover:text-red-600">
                  Return to Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 max-w-4xl">
      <div className="mb-4 md:mb-6">
        <Link to="/admin" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Admin Dashboard
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-3 px-4 md:py-4 md:px-6">
          <h1 className="text-white text-lg md:text-xl font-bold truncate">
            Editing: {currentMovie.title}
          </h1>
        </div>
        
        <MovieForm initialData={currentMovie} mode="edit" />
      </div>
    </div>
  );
};

export default MovieEditPage;