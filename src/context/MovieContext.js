import { createContext, useContext, useEffect, useState } from 'react';
import * as movieService from '../api/movieApi';
import * as commentLikeService from '../api/commentLikeApi';

const MovieContext = createContext();

function MovieContextProvider({ children }) {
  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [movies, setMovies] = useState([]);
  const [commentLikes, setCommentLikes] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const resMovies = await movieService.getAllMovies();
        const resCommentLikes = await commentLikeService.getAllCommentLikes();
        setMovies(resMovies.data.movies);
        setCommentLikes(resCommentLikes.data.commentLikes);
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

  return (
    <MovieContext.Provider
      value={{
        openAddMovie,
        toggleAddMovie,
        createMovie,
        movies,
        commentLikes
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
