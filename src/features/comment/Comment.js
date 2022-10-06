import { useEffect, useState } from 'react';
import * as commentLikeService from '../../api/commentLikeApi';
import Avatar from '../../components/Avatar';
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
    <div className='flex items-center justify-start'>
      <div className='mr-3 h-[50px] w-[50px]'>
        <Avatar size='50' />
      </div>
      <div className='flex py-3 px-5 items-center bg-blue-500 text-white rounded-r-full rounded-bl-full relative'>
        <div className=' px-2 break-words'>{title}</div>
        {commentLikes?.filter((item) => item.commentId === id).length === 0 ? (
          ''
        ) : (
          <div className='w-10 p-2 text-end'>
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Comment;
