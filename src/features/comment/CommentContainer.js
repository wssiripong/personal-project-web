import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMovie } from '../../context/MovieContext';
import CommentList from './CommentList';
import * as commentService from '../../api/commentApi';

function CommentContainer({ movieId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const { updateComment } = useMovie();

  const {
    user: { id }
  } = useAuth();

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

  const addComment = async () => {
    try {
      const res = await updateComment({ userId: id, movieId, title: comment });
      setComments([...comments, res.data.comment]);
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      const newComments = comments.filter((item) => item.id !== commentId);
      setComments([newComments]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='bg-blue-500 mt-5 p-2'>
        <CommentList
          movieId={movieId}
          comments={comments}
          deleteComment={deleteComment}
        />
      </div>
      <div className='pt-2 mt-2 h-16 flex justify-between gap-2'>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='w-5/6 -mb-[5px] p-2 h-14 text-center outline-blue-500 rounded-md '
        />
        <button
          onClick={addComment}
          className='bg-blue-500 text-white w-16 h-full rounded-md hover:opacity-100 hover:scale-110'
        >
          POST
        </button>
      </div>
    </div>
  );
}

export default CommentContainer;
