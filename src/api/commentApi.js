import axios from '../config/axios';

export const addComment = (input) => axios.post('/comments', input);

export const getAllComments = () => axios.get('/comments');

export const adminDeleteComment = (commentId) =>
  axios.delete(`/admin/comments/${commentId}`);

export const deleteComment = (commentId, userId) =>
  axios.delete(`/comments/${commentId}/${userId}`);
