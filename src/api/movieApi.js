import axios from '../config/axios';

export const createMovie = (input) => axios.post('/admin/movies', input);

export const getAllMovies = () => axios.get('/movies');
