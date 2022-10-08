import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CommentList from './CommentList';
import * as commentService from '../../api/commentApi';

function CommentContainer({ movieId, movieModalClose }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const { user, toggleLogin } = useAuth();

  const fetchAllComments = async () => {
    try {
      const res = await commentService.getAllComments();
      setComments(res.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  const addComment = async (input) => {
    try {
      const res = await commentService.addComment(input);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddComment = async () => {
    try {
      const res = await addComment({
        userId: user?.id,
        movieId,
        title: comment
      });
      setComments([...comments, res.data.comment]);
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  const adminDeleteComment = async (commentId) => {
    try {
      await commentService.adminDeleteComment(commentId);
      const newComments = comments.filter((item) => item.id !== commentId);
      setComments(newComments);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (commentId, userId) => {
    try {
      await commentService.deleteComment(commentId, userId);
      const newComments = comments.filter((item) => item.id !== commentId);
      setComments(newComments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = () => {
    movieModalClose();
    toggleLogin();
  };

  return (
    <div>
      <div className='p-2'>
        <CommentList
          movieId={movieId}
          comments={comments}
          adminDeleteComment={adminDeleteComment}
          deleteComment={deleteComment}
        />
      </div>
      <div
        onClick={user ? null : handleSignIn}
        className='pt-2 mt-2 h-16 flex justify-between gap-2'
      >
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='w-5/6 -mb-[5px] p-2 h-14 text-center outline-blue-500 rounded-md '
        />
        <button
          onClick={user ? handleAddComment : null}
          className='bg-blue-500 text-white text-base font-bangers font-medium w-16 h-full rounded-md hover:opacity-100 hover:scale-110 active:scale-95 transition-all'
        >
          POST
        </button>
      </div>
    </div>
  );
}

export default CommentContainer;
