import Comment from './Comment';

function CommentList({ movieId, comments }) {
  return (
    <div>
      {comments.map((item) =>
        item.movieId === movieId ? <Comment key={item.id} item={item} /> : ''
      )}
    </div>
  );
}

export default CommentList;
