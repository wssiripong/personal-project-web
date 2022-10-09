import { useState } from 'react';
import { useMovie } from '../context/MovieContext';
import MovieModal from './MovieModal';

function MovieContainer() {
  const { movies, category } = useMovie();
  const [isOpen, setIsOpen] = useState(false);
  const [pick, setPick] = useState({});

  const viewMovie = (input) => {
    setPick(input);
    setIsOpen(true);
  };

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-7 gap-12'>
        {category
          ? movies?.map((item) => {
              if (item.category === category) {
                return (
                  <div
                    className='h-60 w-40 shadow-2xl hover:scale-110 transition-all ease-in-out relative'
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
              }
            })
          : movies?.map((item) => (
              <div
                className='h-60 w-40 shadow-2xl hover:scale-110 transition-all ease-in-out relative'
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
