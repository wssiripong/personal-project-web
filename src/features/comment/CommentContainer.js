import CommentList from './CommentList';

function CommentContainer({ movieId, comments }) {
  return (
    <div className='bg-blue-500 w-[460px] h-20 mt-5'>
      <CommentList movieId={movieId} comments={comments} />
    </div>
  );
}

export default CommentContainer;
