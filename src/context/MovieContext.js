import { createContext, useContext, useEffect, useState } from 'react';
import * as movieService from '../api/movieApi';
import * as commentService from '../api/commentApi';

const MovieContext = createContext();

function MovieContextProvider({ children }) {
  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [movies, setMovies] = useState([]);

  const updateComment = async (input) => {
    try {
      const res = await commentService.updateComment(input);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

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
        movies,
        updateComment
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
