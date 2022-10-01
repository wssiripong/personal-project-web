import CommentContainer from '../features/comment/CommentContainer';

function MovieModal({
  open,
  movieInfo: { id, coverImage, title, description, Comments },
  close
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center'
      onClick={close}
    >
      <div
        className=' bg-slate-200 p-5 w-[500px]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='text-center pb-5'>
          <div className='text-3xl'>{title}</div>
        </div>
        <div className='flex justify-around'>
          <img
            src={coverImage}
            className='h-60 w-40 object-cover flex-1'
            alt=''
          />
          <div className='flex-1 text-center'>{description}</div>
        </div>
        <CommentContainer movieId={id} comments={Comments} />
      </div>
    </div>
  );
}

export default MovieModal;
