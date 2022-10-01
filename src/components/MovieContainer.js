import { useMovie } from '../context/MovieContext';

function MovieContainer() {
  const { movies } = useMovie();
  return (
    <>
      <div className='grid grid-cols-5 container gap-3'>
        {movies.map((item) => (
          <div key={item.id} item={item}>
            <img className='object-cover h-60 w-40' src={item.coverImage} />
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieContainer;
