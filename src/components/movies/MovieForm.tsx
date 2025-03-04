import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { addMovie, updateMovie } from '../../store/slices/movieSlice';
import { Movie, MovieFormData } from '../../types/movie';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { showSuccess, showError } from '../../utils/toast';

interface MovieFormProps {
  initialData?: Movie | null;
  mode: 'add' | 'edit';
}

const MovieForm: React.FC<MovieFormProps> = ({ initialData, mode }) => {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    description: '',
    duration: 90,
    price: 0,
    showtime: '',
    total_seats: 0, 
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        duration: initialData.duration,
        price: initialData.price,
        showtime: initialData.showtime,
        total_seats: initialData.total_seats,
      });
    }
  }, [initialData, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' || name === 'total_seats' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'add') {
        await dispatch(addMovie(formData)).unwrap();
        showSuccess('Movie added successfully!');
        setFormData({
          title: '',
          description: '',
          duration: 90,
          price: 0,
          showtime: '',
          total_seats: 0,
        });
      } else if (mode === 'edit' && initialData) {
        await dispatch(updateMovie({
          id: initialData.id,
          movieData: formData,
        })).unwrap();
        showSuccess('Movie updated successfully!');
      }
      navigate('/admin');
    } catch (error) {
      showError('Failed to save movie.');
    }
  };

  return (
    <Card className="w-full mx-auto p-3 md:p-6 shadow-md rounded-xl bg-white border border-gray-100">
      <div className="flex flex-wrap items-center mb-4 md:mb-6">
        <div className="mr-3 bg-blue-100 p-2 rounded-lg">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {mode === 'add' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            )}
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight">
          {mode === 'add' ? 'Add New Movie' : 'Edit Movie'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Movie Title</label>
          <Input 
            id="title"
            name="title" 
            type="text" 
            required 
            value={formData.title} 
            onChange={handleChange} 
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            placeholder="Enter movie title"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm min-h-[100px] resize-none"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter movie description"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <Input 
              id="duration"
              name="duration" 
              type="number" 
              min="1" 
              required 
              value={formData.duration.toString()} 
              onChange={handleChange} 
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <Input 
              id="price"
              name="price" 
              type="number" 
              min="0" 
              step="0.01" 
              required 
              value={formData.price.toString()} 
              onChange={handleChange} 
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="showtime" className="block text-sm font-medium text-gray-700 mb-1">Showtime</label>
          <Input 
            id="showtime"
            name="showtime" 
            type="datetime-local" 
            required 
            value={formData.showtime.substring(0, 16)} 
            onChange={handleChange} 
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          />
        </div>

        {mode === 'add' && (
          <div>
            <label htmlFor="total_seats" className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
            <Input 
              id="total_seats"
              name="total_seats" 
              type="number" 
              min="1" 
              required 
              value={formData.total_seats.toString()} 
              onChange={handleChange} 
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
            />
            <p className="mt-1 text-xs text-gray-500">Once set, the total number of seats cannot be changed later.</p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 mt-5">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin')} 
              className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Cancel
            </Button>
            
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-sm font-medium flex items-center justify-center"
            >
              {mode === 'add' ? (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Movie
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Update Movie
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default MovieForm;