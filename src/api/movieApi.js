import axios from '../config/axios';

export const createMovie = (input) => axios.post('/admin/movies', input);

export const deleteMovie = (id) => axios.delete(`/admin/movies/${id}`);

export const getAllMovies = () => axios.get('/movies');

export const searchMovie = (title) => axios.get(`/movies/${title}`);

export const updateMovie = (id, input) =>
  axios.patch(`/admin/movies/${id}`, input);
