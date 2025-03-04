import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { deleteMovie } from '../../store/slices/movieSlice';
import { Movie } from '../../types/movie';
import Button from '../ui/Button';
import { showSuccess, showError } from '../../utils/toast';

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatShowtime = (isoString: string) => {
    return new Date(isoString).toLocaleString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await dispatch(deleteMovie(movie.id)).unwrap();
        showSuccess('Movie deleted successfully!');
      } catch (error) {
        showError('Failed to delete movie.');
      }
    }
  };


  const handleUpdate = () => {
    navigate(`/admin/movies/edit/${movie.id}`);
  };

  const getAvailabilityColor = () => {
    const availabilityPercentage = (movie.available_seats / movie.total_seats) * 100;
    if (availabilityPercentage > 50) return 'text-green-600 bg-green-50';
    if (availabilityPercentage > 20) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
          {movie.title.substring(0, 1)}
        </div>
      </div>
      
      <div className="p-3 sm:p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">{movie.title}</h3>
          <span className="text-xs font-medium py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-full bg-blue-50 text-blue-600 whitespace-nowrap">
            {movie.duration} min
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-2 sm:mb-3">{movie.description || 'No description available'}</p>
        
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium text-gray-800">{formatPrice(movie.price)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Showtime:</span>
            <span className="font-medium text-gray-800">{formatShowtime(movie.showtime).split(',')[0]}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Available:</span>
            <span className={`font-medium px-1.5 py-0.5 rounded-full text-xs ${getAvailabilityColor()}`}>
              {movie.available_seats} / {movie.total_seats} seats
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 border-t border-gray-100 bg-gray-50 mt-auto">
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          <Link to={`/movies/${movie.id}`} className="col-span-1">
            <Button className="w-full py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <span className="hidden sm:inline">View</span>
            </Button>
          </Link>
          
          <Button 
            onClick={handleUpdate} 
            className="col-span-1 py-1.5 sm:py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs sm:text-sm flex items-center justify-center"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span className="hidden sm:inline">Edit</span>
          </Button>
          
          <Button 
            onClick={handleDelete} 
            className="col-span-1 py-1.5 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs sm:text-sm flex items-center justify-center"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;