import { useMovie } from '../context/MovieContext';

function MovieContainer() {
  const { movies } = useMovie();
  return (
    <>
      {movies.map((item) => (
        <div>
          <img src={item.coverImage} />
        </div>
      ))}
    </>
  );
}

export default MovieContainer;
