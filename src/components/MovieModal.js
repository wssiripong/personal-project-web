import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useMovie } from '../context/MovieContext';
import {
  CATEGORY_ACTION,
  CATEGORY_DRAMA,
  CATEGORY_ANIME,
  CATEGORY_COMEDY,
  CATEGORY_CRIME,
  CATEGORY_DOCUMENTARY,
  CATEGORY_FAMILY,
  CATEGORY_FANTASY,
  CATEGORY_HORROR,
  CATEGORY_ROMANCE,
  CATEGORY_THRILLER,
  CATEGORY_TV_SHOWS
} from '../config/constants';
import CommentContainer from '../features/comment/CommentContainer';
import * as watchlistService from '../api/watchlistApi';
import * as movieService from '../api/movieApi';
import * as movieLikeService from '../api/movieLikeApi';
import TrashIcon from './svg/TrashIcon';
import EditIcon from './svg/EditIcon';
import PictureIcon from './svg/PictureIcon';
import CheckIcon from './svg/CheckIcon';
import StarIcon from './svg/StarIcon';
import { useLoading } from '../context/LoadingContext';
import LoadingModal from '../components/LoadingModal';

function MovieModal({
  open,
  movieInfo: { id, coverImage, title, description, MovieLikes },
  close,
  editPick
}) {
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState({
    title: '',
    category: '',
    description: '',
    coverImage: null
  });
  const [file, setFile] = useState(null);
  const {
    deleteMovie,
    watchlists,
    updateWatchlists,
    fetchMovies,
    updateMovieLikes,
    movieLikes
  } = useMovie();
  const { user } = useAuth();
  const { startLoading, stopLoading, loading } = useLoading();

  const selectFileEl = useRef();

  const fetchWatchlist = async () => {
    try {
      const res = await watchlistService.getAllWatchlist();
      updateWatchlists(res.data.watchlists);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateMovieLikes(MovieLikes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MovieLikes]);

  const handleDelete = async () => {
    try {
      await deleteMovie(id);
      close();
      toast.success('delete successful');
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  const handleAddWatchlist = async () => {
    try {
      const res = await watchlistService.createWatchlist(id);
      updateWatchlists([...watchlists, res.data.watchlist]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteWatchlist = async () => {
    try {
      await watchlistService.deleteWatchlist(id);
      fetchWatchlist();
    } catch (err) {
      console.log(err);
    }
  };

  const addWatchlist = (e) => {
    e.stopPropagation();
    handleAddWatchlist();
  };

  const removeWatchlist = (e) => {
    e.stopPropagation();
    handleDeleteWatchlist();
  };

  const handleCloseModal = () => {
    setEdit(false);
    setEditInput({
      title: '',
      category: '',
      description: '',
      coverImage: null
    });
    setFile(null);
    close();
  };

  const handleUpdateMovie = async () => {
    try {
      startLoading();
      const formData = new FormData();
      if (editInput.title) {
        formData.append('title', editInput.title);
      }
      if (editInput.category) {
        formData.append('category', editInput.category);
      }
      if (editInput.description) {
        formData.append('description', editInput.description);
      }
      if (editInput.coverImage) {
        formData.append('coverImage', editInput.coverImage);
      }
      const res = await movieService.updateMovie(id, formData);
      editPick(res.data.movie);
      fetchMovies();

      setEditInput({
        title: '',
        category: '',
        description: '',
        coverImage: null
      });
      setEdit(false);
      stopLoading();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddMovieLike = async () => {
    try {
      const res = await movieLikeService.createMovieLike(id);
      updateMovieLikes([...movieLikes, res.data.movieLike]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveMovieLike = async () => {
    try {
      await movieLikeService.deleteMovieLike(id);
      const newMovieLikes = movieLikes.filter(
        (item) => item.movieId !== id || item.userId !== user.id
      );
      updateMovieLikes(newMovieLikes);
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-black/50 flex items-center justify-center gap-16 font-sans text-lg z-50'
      onClick={handleCloseModal}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className='relative fadein'>
          <div className='w-[320px] p-3 absolute top-0 bottom-0 opacity-0 hover:opacity-100 hover:backdrop-blur hover:bg-black/30 transition-all'>
            <div className='text-3xl mt-16 text-white text-center'>{title}</div>
            <div className=' text-slate-300 mt-5 text-center'>
              {description}
            </div>

            <div
              onClick={
                user
                  ? movieLikes?.find(
                      (item) => item.movieId === id && item.userId === user.id
                    )
                    ? handleRemoveMovieLike
                    : handleAddMovieLike
                  : null
              }
              className='flex justify-center items-center mt-2 mb-5 text-white text-2xl font-bangers relative cursor-pointer active:scale-90'
            >
              <div>
                <StarIcon />
              </div>
              <div className='text-blue-500 pt-1 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                {movieLikes?.length}
              </div>
            </div>
          </div>
          <img
            src={file ? URL.createObjectURL(file) : coverImage}
            className='h-120 w-80 object-cover'
            alt=''
          />

          {user?.role === 'ADMIN' ? (
            <>
              <button
                onClick={handleDelete}
                className='bg-red-500 h-10 w-10 text-white absolute top-2 right-2 pl-[7.5px] rounded-full opacity-70 hover:opacity-100'
              >
                <TrashIcon />
              </button>
              <button
                onClick={() => setEdit((prev) => !prev)}
                className='bg-yellow-500 h-10 w-10 text-white absolute top-2 left-2 pl-[7.5px] rounded-full opacity-70 hover:opacity-100'
              >
                <EditIcon />
              </button>
            </>
          ) : (
            ''
          )}
        </div>
        {user && (
          <div
            onClick={
              watchlists.find(
                (item) => item.userId === user.id && item.movieId === id
              )
                ? removeWatchlist
                : addWatchlist
            }
            className={`text-white text-center mx-auto p-3 mt-5 rounded-md font-bangers text-lg fadein active:scale-95  transition-all cursor-pointer ${
              watchlists.find(
                (item) => item.userId === user.id && item.movieId === id
              )
                ? 'w-48 bg-yellow-500 active:bg-yellow-600'
                : 'w-36 bg-green-500 active:bg-green-600'
            }`}
          >
            {watchlists.find(
              (item) => item.userId === user.id && item.movieId === id
            )
              ? 'Remove from watchlist'
              : 'Add to watchlist'}
          </div>
        )}
      </div>
      <div
        className='p-5 w-[500px] rounded-lg flex flex-col justify-end fadein'
        onClick={(e) => e.stopPropagation()}
      >
        {edit ? (
          <div className='flex flex-col justify-center items-center gap-3 font-bangers'>
            <input
              type='text'
              className='text-center p-2 w-[250px] outline-blue-500 rounded-lg'
              placeholder={title}
              value={editInput.title}
              onChange={(e) =>
                setEditInput({ ...editInput, title: e.target.value })
              }
            />
            <button
              onClick={() => selectFileEl.current.click()}
              className='bg-orange-500 text-white flex justify-center p-2 w-[250px] rounded-lg'
            >
              <PictureIcon />
            </button>
            <select
              className='w-[250px] p-2 rounded-lg text-center outline-blue-500 text-gray-400'
              onChange={(e) =>
                setEditInput({ ...editInput, category: e.target.value })
              }
            >
              <option value=''>choose category</option>
              <option value={CATEGORY_ACTION}>Action</option>
              <option value={CATEGORY_ANIME}>Anime</option>
              <option value={CATEGORY_COMEDY}>Comedy</option>
              <option value={CATEGORY_CRIME}>Crime</option>
              <option value={CATEGORY_DOCUMENTARY}>Documentary</option>
              <option value={CATEGORY_DRAMA}>Drama</option>
              <option value={CATEGORY_FAMILY}>Family</option>
              <option value={CATEGORY_FANTASY}>Fantasy</option>
              <option value={CATEGORY_HORROR}>Horror</option>
              <option value={CATEGORY_ROMANCE}>Romance</option>
              <option value={CATEGORY_THRILLER}>Thriller</option>
              <option value={CATEGORY_TV_SHOWS}>TV Shows</option>
            </select>
            <textarea
              type='text'
              className='text-center p-2 outline-blue-500 rounded-lg h-[300px] w-[250px]'
              placeholder='Description'
              value={editInput.description}
              onChange={(e) =>
                setEditInput({ ...editInput, description: e.target.value })
              }
            />

            <input
              type='file'
              ref={selectFileEl}
              className='hidden'
              onChange={(e) => {
                setFile(e.target.files[0]);
                setEditInput({ ...editInput, coverImage: e.target.files[0] });
              }}
            />
            <button
              onClick={handleUpdateMovie}
              className='bg-blue-500 text-white flex justify-center p-2 w-[250px] rounded-lg'
            >
              <CheckIcon />
            </button>
          </div>
        ) : (
          <CommentContainer movieId={id} movieModalClose={close} />
        )}
      </div>
      {loading && <LoadingModal />}
    </div>
  );
}

export default MovieModal;
