import { Movie } from '../types/movie';

interface MovieInfoCardProps {
  movie: Movie;
}

const formatShowtime = (isoString: string) => {
  return new Date(isoString).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',  
  });
};

const MovieInfoCard = ({ movie }: MovieInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 bg-blue-100 flex items-center justify-center p-8">
          {/* Placeholder for movie poster */}
          <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
          </svg>
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{movie.title}</h1>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              ${movie.price.toFixed(2)}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
            <div className=''>
              <span className="font-semibold">Duration:</span> {movie.duration} minutes
            </div>

            <div>
              <span className="font-semibold">Showtime:</span> {formatShowtime(movie.showtime)}
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Synopsis</h3>
            <p className="text-gray-600">{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoCard;