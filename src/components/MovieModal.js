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
      className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center'
      onClick={close}
    >
      <div
        className=' bg-slate-200 p-5 w-[500px] fadein'
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
          <div className='flex-1'>
            <div className='flex flex-col h-full relative'>
              <div className='h-1/2 text-center'>{description}</div>
              {user.role === 'ADMIN' ? (
                <button
                  onClick={handleDelete}
                  className='bg-red-500 h-10 w-10 text-white absolute right-[235px] top-[5px] rounded-full opacity-70 hover:opacity-100'
                >
                  X
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <CommentContainer movieId={id} />
      </div>
    </div>
  );
}

export default MovieModal;
