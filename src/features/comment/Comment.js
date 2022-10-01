import { useMovie } from '../../context/MovieContext';

function Comment({ item: { id, title, movieId } }) {
  const { commentLikes } = useMovie();

  return (
    <div className='flex justify-between p-2 bg-yellow-300 text-black'>
      <div>{title}</div>
      <div>
        {
          commentLikes.map((item) => (item.commentId === id ? item.id : ''))
            .length
        }
      </div>
    </div>
  );
}

export default Comment;
