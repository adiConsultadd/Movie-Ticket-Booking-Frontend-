import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchMovie, updateMovie } from '../../store/slices/movieSlice';
import { Movie } from '../../types/movie';
import Button from '../ui/Button';
import { showSuccess, showError } from '../../utils/toast';

const MovieEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movie, loading } = useAppSelector((state) => state.movie);

  const [formData, setFormData] = useState<Movie>({
    id: '',
    title: '',
    description: '',
    duration: 0,
    price: 0,
    showtime: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchMovie(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updateMovie(formData)).unwrap();
      showSuccess('Movie updated successfully!');
      navigate('/movies');
    } catch (error) {
      showError('Failed to update movie.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Edit Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Duration (minutes)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Price (INR)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Showtime</label>
          <input type="datetime-local" name="showtime" value={formData.showtime} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div className="flex space-x-2">
          <Button type="submit" className="bg-blue-500 flex-1">Update</Button>
          <Button type="button" className="bg-gray-400 flex-1" onClick={() => navigate('/movies')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default MovieEdit;
