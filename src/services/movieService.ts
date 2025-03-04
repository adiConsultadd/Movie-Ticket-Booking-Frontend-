import api from './api';
import { Movie, MovieFormData } from '../types/movie';

export const getAllMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/admin/movies/');
  return response.data;
};

export const getMovie = async (id: number): Promise<Movie> => {
  const response = await api.get(`/admin/movies/${id}/`);
  return response.data;
};

export const addMovieUser = async (movieData: MovieFormData): Promise<Movie> => {
  const response = await api.post('/admin/movies/', movieData);
  return response.data;
};

export const updateMovieUser = async (id: number, movieData: MovieFormData): Promise<Movie> => {
  const response = await api.put(`/admin/movies/${id}/`, movieData);
  return response.data;
};

export const deleteMovieUser = async (id: number): Promise<void> => {
  await api.delete(`/admin/movies/${id}/`);
};