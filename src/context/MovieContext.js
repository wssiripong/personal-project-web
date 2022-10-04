import { createContext, useContext, useEffect, useState } from 'react';
import * as movieService from '../api/movieApi';

const MovieContext = createContext();

function MovieContextProvider({ children }) {
  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const resMovies = await movieService.getAllMovies();
        setMovies(resMovies.data.movies);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovies();
  }, []);

  const toggleAddMovie = () => {
    setOpenAddMovie((prev) => !prev);
  };

  const createMovie = async (input) => {
    const res = await movieService.createMovie(input);
    setMovies([res.data.movie, ...movies]);
  };

  const deleteMovie = async (id) => {
    await movieService.deleteMovie(id);
    const res = movies.filter((item) => item.id !== id);
    setMovies(res);
  };

  return (
    <MovieContext.Provider
      value={{
        openAddMovie,
        toggleAddMovie,
        createMovie,
        deleteMovie,
        movies
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContextProvider;

export const useMovie = () => {
  return useContext(MovieContext);
};
