import { useEffect, useState } from 'react';
import * as commentLikeService from '../../api/commentLikeApi';
import { useAuth } from '../../context/AuthContext';

function Comment({ item: { id, title, userId } }) {
  const [commentLikes, setCommentLikes] = useState([]);
  const [commentUser, setCommentUser] = useState({});

  const { getUser } = useAuth();

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
  }, []);

  return (
    <div className='flex justify-between p-2 bg-yellow-300 text-black'>
      <div>
        {commentUser.firstName} {commentUser.lastName}
      </div>
      <div>{title}</div>
      <div>
        {
          commentLikes?.map((item) => (item.commentId === id ? item.id : ''))
            .length
        }
      </div>
    </div>
  );
}

export default Comment;
