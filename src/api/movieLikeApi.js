import axios from '../config/axios';

export const createMovieLike = (id) =>
  axios.post('/movielikes/create', {
    id
  });

export const deleteMovieLike = (movieId) =>
  axios.delete(`/movielikes/delete/${movieId}`);
