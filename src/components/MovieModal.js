import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

import { useMovie } from '../context/MovieContext';
import CommentContainer from '../features/comment/CommentContainer';

function MovieModal({
  open,
  movieInfo: { id, coverImage, title, description },
  close
}) {
  const { deleteMovie } = useMovie();
  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      await deleteMovie(id);
      close();
      toast.success('delete successful');
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-opacity-50 flex items-center justify-center gap-16'
      onClick={close}
    >
      <div>
        <div onClick={(e) => e.stopPropagation()} className='relative fadein'>
          <div className='w-[320px] p-3 absolute top-0 bottom-0 opacity-0 hover:opacity-100 hover:backdrop-blur transition-all'>
            <div className='text-3xl mt-16 text-white text-center'>{title}</div>
            <div className=' text-slate-300 mt-5 text-center'>
              {description}
            </div>
          </div>
          <img src={coverImage} className='h-120 w-80 object-cover' alt='' />
          {user?.role === 'ADMIN' ? (
            <button
              onClick={handleDelete}
              className='bg-red-500 h-10 w-10 text-white absolute top-2 right-2 rounded-full opacity-70 hover:opacity-100'
            >
              X
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
      <div
        className='p-5 w-[500px] rounded-lg flex flex-col gap-5 fadein'
        onClick={(e) => e.stopPropagation()}
      >
        <CommentContainer movieId={id} movieModalClose={close} />
      </div>
    </div>
  );
}

export default MovieModal;
