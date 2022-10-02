import { useEffect, useState } from 'react';
import * as commentLikeService from '../../api/commentLikeApi';

function Comment({ item: { id, title, movieId } }) {
  const [commentLikes, setCommentLikes] = useState([]);

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

  return (
    <div className='flex justify-between p-2 bg-yellow-300 text-black'>
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
