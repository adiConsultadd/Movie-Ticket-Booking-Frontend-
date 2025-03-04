import { useEffect} from 'react';
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import LoadingSpinner from '../components/ui/Loader';
import MovieInfoCard from './MovieInfoCard';
import { fetchMovie } from '../store/slices/movieSlice';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const { currentMovie, loading: movieLoading, error: movieError } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(parseInt(id)) as any);  
    }
  }, [id, dispatch]);


  if (movieLoading) {
    return <LoadingSpinner />;
  }

  if (movieError || !currentMovie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {movieError || 'Movie not found'}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <MovieInfoCard movie={currentMovie} />
    </div>
  );
};

export default MovieDetails;