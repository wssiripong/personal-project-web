import { useState } from 'react';
import { useMovie } from '../context/MovieContext';
import MovieModal from './MovieModal';

function MovieContainer() {
  const { movies } = useMovie();
  const [isOpen, setIsOpen] = useState(false);
  const [pick, setPick] = useState({});

  const viewMovie = (input) => {
    setPick(input);
    setIsOpen(true);
  };

  return (
    <>
      <div className='grid grid-cols-9 gap-5'>
        {movies.map((item) => (
          <div
            className='h-60 w-40'
            key={item.id}
            item={item}
            onClick={() => viewMovie(item)}
          >
            <img
              className='object-cover h-full w-full '
              src={item.coverImage}
              alt=''
            />
          </div>
        ))}
        <MovieModal
          open={isOpen}
          movieInfo={pick}
          close={() => setIsOpen(false)}
        />
      </div>
    </>
  );
}

export default MovieContainer;
