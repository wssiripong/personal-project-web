import { useEffect, useState } from 'react';
import * as commentLikeService from '../../api/commentLikeApi';
import { useAuth } from '../../context/AuthContext';

function Comment({
  item: { id, title, userId },
  adminDeleteComment,
  deleteComment
}) {
  const [commentLikes, setCommentLikes] = useState([]);
  const [commentUser, setCommentUser] = useState({});

  const { getUser, user } = useAuth();

  useEffect(() => {
    const fetchCommentLikes = async () => {
      try {
        const resCommentLikes = await commentLikeService.getAllCommentLikes();
        setCommentLikes(resCommentLikes.data.commentLikes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCommentLikes();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUser(userId);
        setCommentUser(user);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, [userId, getUser]);

  return (
    <div className='flex p-2 items-center bg-yellow-300 text-black'>
      <div className='w-32'>
        {commentUser.firstName} {commentUser.lastName}
      </div>
      <div className='w-60 px-2 break-words'>{title}</div>
      <div className='w-10 p-2 text-end'>
        {commentLikes?.filter((item) => item.commentId === id).length === 0
          ? ''
          : commentLikes?.filter((item) => item.commentId === id).length}
      </div>
      {commentUser.id === user.id ? (
        <button
          onClick={
            user.role === 'ADMIN'
              ? () => adminDeleteComment(id)
              : () => deleteComment(id, user.id)
          }
          className='bg-red-500 p-2 h-10 text-white'
        >
          delete
        </button>
      ) : user.role === 'ADMIN' ? (
        <button
          onClick={
            user.role === 'ADMIN'
              ? () => adminDeleteComment(id)
              : () => deleteComment(id, user.id)
          }
          className='bg-red-500 p-2 h-10 text-white'
        >
          delete
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default Comment;
