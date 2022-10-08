import axios from '../config/axios';

export const getAllWatchlist = () => axios.get('/watchlists');

export const createWatchlist = (id) => axios.post('/watchlists/create', { id });

export const deleteWatchlist = (id) => axios.delete(`/watchlists/delete/${id}`);
