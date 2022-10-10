import { createContext, useContext, useEffect, useState } from 'react';
import * as movieService from '../api/movieApi';

const MovieContext = createContext();

function MovieContextProvider({ children }) {
  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [movies, setMovies] = useState([]);
  const [openSideModal, setOpenSideModal] = useState(false);
  const [watchlists, setWatchlists] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState(false);
  const [movieLikes, setMovieLikes] = useState([]);

  const fetchMovies = async () => {
    try {
      const resMovies = await movieService.getAllMovies();
      setMovies(resMovies.data.movies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [watchlists, movieLikes]);

  const toggleAddMovie = () => {
    setOpenAddMovie((prev) => !prev);
  };

  const toggleSideModal = () => {
    setOpenSideModal((prev) => !prev);
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

  const updateWatchlists = (input) => {
    setWatchlists(input);
  };

  const selectCategory = (input) => {
    setCategory(input);
  };

  const toggleSearch = () => {
    setSearch((prev) => !prev);
  };

  const updateMovieLikes = (input) => {
    setMovieLikes(input);
  };

  return (
    <MovieContext.Provider
      value={{
        openAddMovie,
        toggleAddMovie,
        createMovie,
        deleteMovie,
        movies,
        openSideModal,
        toggleSideModal,
        watchlists,
        updateWatchlists,
        category,
        selectCategory,
        search,
        toggleSearch,
        fetchMovies,
        updateMovieLikes,
        movieLikes
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
