import axios from '../config/axios';

export const getAllCommentLikes = () => axios.get('/commentlikes');

export const createCommentLike = (id) =>
  axios.post('/commentlikes/create', { id });

export const deleteCommentLike = (id) =>
  axios.delete(`/commentlikes/delete/${id}`);
