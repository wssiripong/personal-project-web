import Comment from './Comment';

function CommentList({ movieId, comments, deleteComment }) {
  return (
    <div className='flex flex-col gap-2 max-h-80 overflow-auto hidescroll'>
      {comments?.map((item) =>
        item.movieId === movieId ? (
          <Comment key={item.id} item={item} deleteComment={deleteComment} />
        ) : (
          ''
        )
      )}
    </div>
  );
}

export default CommentList;
