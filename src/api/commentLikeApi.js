import axios from '../config/axios';

export const getAllCommentLikes = () => axios.get('/commentlikes');
