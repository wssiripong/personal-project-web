import Comment from './Comment';

function CommentList({ movieId, comments, adminDeleteComment, deleteComment }) {
  return (
    <div className='flex flex-col gap-2 max-h-80 overflow-auto hidescroll'>
      {comments?.map((item) =>
        item.movieId === movieId ? (
          <Comment
            key={item.id}
            item={item}
            adminDeleteComment={adminDeleteComment}
            deleteComment={deleteComment}
          />
        ) : (
          ''
        )
      )}
    </div>
  );
}

export default CommentList;
