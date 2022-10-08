import { useEffect, useState } from 'react';
import * as commentLikeService from '../../api/commentLikeApi';
import Avatar from '../../components/Avatar';
import LikeIcon from '../../components/svg/LikeIcon';
import TrashIcon from '../../components/svg/TrashIcon';
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

  const handleClickLike = async () => {
    try {
      const res = await commentLikeService.createCommentLike(id);
      setCommentLikes([...commentLikes, res.data.commentLike]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnClickLike = async () => {
    try {
      await commentLikeService.deleteCommentLike(id);
      const newCommentLikes = commentLikes.filter(
        (item) => item.userId !== user.id || item.commentId !== id
      );
      setCommentLikes(newCommentLikes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex items-start justify-start'>
      <div className='mr-3 h-[50px] w-[50px]'>
        <Avatar src={commentUser.profileImage} size='50' />
      </div>
      <div className='flex items-center bg-blue-500 text-white rounded-r-full rounded-bl-full relative'>
        <div className=' px-5 py-2 break-words max-w-[300px]'>{title}</div>
        {user &&
          (user?.id === commentUser.id ? null : commentLikes.find(
              (item) => item.userId === user.id && item.commentId === id
            ) ? (
            <div onClick={handleUnClickLike}>
              <LikeIcon liked={true} />
            </div>
          ) : (
            <div className='pr-2' onClick={handleClickLike}>
              <LikeIcon liked={false} />
            </div>
          ))}
        {commentLikes?.filter((item) => item.commentId === id).length === 0 ? (
          ''
        ) : (
          <div className='w-5 mr-1 text-center'>
            {commentLikes?.filter((item) => item.commentId === id).length}
          </div>
        )}

        {commentUser.id === user?.id ? (
          <button
            onClick={
              user?.role === 'ADMIN'
                ? () => adminDeleteComment(id)
                : () => deleteComment(id, user?.id)
            }
            className='text-white rounded-full absolute -right-9'
          >
            <TrashIcon />
          </button>
        ) : user?.role === 'ADMIN' ? (
          <button
            onClick={
              user?.role === 'ADMIN'
                ? () => adminDeleteComment(id)
                : () => deleteComment(id, user?.id)
            }
            className='text-white rounded-full absolute -right-9'
          >
            <TrashIcon />
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Comment;
