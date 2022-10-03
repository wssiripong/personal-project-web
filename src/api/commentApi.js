import axios from '../config/axios';

export const updateComment = (input) => axios.post('/comments', input);

export const getAllComments = () => axios.get('/comments');

export const deleteComment = (commentId) =>
  axios.delete(`/comments/${commentId}`);
