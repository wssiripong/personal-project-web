import { useState } from 'react';
import * as movieService from '../api/movieApi';
import MovieModal from './MovieModal';

function SearchModal({ open, close }) {
  const [input, setInput] = useState('');
  const [movie, setMovie] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pick, setPick] = useState({});

  const viewMovie = (input) => {
    setPick(input);
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (input) {
        const res = await movieService.searchMovie(input);
        console.log(res.data.movie);
        setMovie(res.data.movie);
        setInput('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      onClick={() => {
        setMovie('');
        close();
      }}
      className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur flex items-center justify-center'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=' bg-slate-200 rounded-2xl flex flex-col items-center fadein'
      >
        <form onSubmit={handleSubmit}>
          <div className='flex p-10'>
            <input
              type='text'
              placeholder='Any movie in mind?'
              className='w-60 h-10 text-center rounded-lg outline-teal-400'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className='ml-5 bg-yellow-500 text-white h-10 px-5 rounded-lg font-bangers cursor-pointer active:scale-90 active:bg-yellow-600'>
              S e a r c h
            </button>
          </div>
        </form>
        {Array.isArray(movie) && movie.length !== 0 && (
          <div className=' flex flex-wrap gap-5 p-10 max-w-[780px] max-h-[600px] overflow-auto'>
            {movie.map((item) => (
              <div key={item.id} className='flex justify-center'>
                <div
                  className='h-60 w-40 shadow-2xl hover:scale-110 transition-all ease-in-out rounded-lg'
                  item={item}
                  onClick={() => viewMovie(item)}
                >
                  <img
                    className='object-cover h-full w-full rounded-lg'
                    src={item.coverImage}
                    alt=''
                  />
                  <div className='h-60 w-40 p-5 text-center absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center text-white font-medium opacity-0 hover:opacity-100 hover:bg-black/30 hover:backdrop-blur-[1px] hover:scale-100 transition-all ease-in-out rounded-lg'>
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <MovieModal
        open={isOpen}
        movieInfo={pick}
        close={() => setIsOpen(false)}
      />
    </div>
  );
}

export default SearchModal;
