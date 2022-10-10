import { useState } from 'react';
import { useMovie } from '../context/MovieContext';
import Avatar from './Avatar';
import MovieModal from './MovieModal';

function UserModal({ open, close, commentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pick, setPick] = useState({});
  const { movies } = useMovie();

  const viewMovie = (input) => {
    setPick(input);
    setIsOpen(true);
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className='fixed top-0 bottom-0 right-0 left-0 backdrop-blur flex flex-col items-center justify-center z-40'
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='z-50 relative fadein'
      >
        <Avatar src={commentUser.profileImage} size='150' />
      </div>
      <div
        className='bg-teal-500 p-5 rounded-lg text-white font-bangers text-3xl -mt-14 pt-[70px] relative fadein'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex gap-5 justify-center text-yellow-300'>
          <div>{commentUser.firstName}</div>
          <div>{commentUser.lastName}</div>
        </div>
        <div className='border-2 w-full my-3'></div>
        <div className='text-center'>{commentUser.email}</div>
        <div className='flex justify-center gap-3 font-sans text-base'>
          {movies.map((item) => {
            if (item.Watchlists.find((s) => s.userId === commentUser.id)) {
              return (
                <div
                  className='mt-5 h-[135px] w-[90px] shadow-2xl hover:scale-110 transition-all ease-in-out relative'
                  key={item.id}
                  item={item}
                  onClick={() => viewMovie(item)}
                >
                  <img
                    className='object-cover h-full w-full rounded-lg'
                    src={item.coverImage}
                    alt=''
                  />
                  <div className='h-full w-full p-5 text-center absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center text-white font-medium opacity-0 hover:opacity-100 hover:bg-black/30 hover:backdrop-blur-[1px] transition-all ease-in-out rounded-lg'>
                    {item.title}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>

        <MovieModal
          open={isOpen}
          movieInfo={pick}
          close={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

export default UserModal;
