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
      <div className='grid grid-cols-5 container gap-3'>
        {movies.map((item) => (
          <div key={item.id} item={item} onClick={() => viewMovie(item)}>
            <img
              className='object-cover h-60 w-40'
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
