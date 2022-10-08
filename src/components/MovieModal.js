import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useMovie } from '../context/MovieContext';
import CommentContainer from '../features/comment/CommentContainer';
import * as watchlistService from '../api/watchlistApi';
import { useEffect, useState } from 'react';

function MovieModal({
  open,
  movieInfo: { id, coverImage, title, description },
  close
}) {
  const { deleteMovie, watchlists, updateWatchlists } = useMovie();
  const { user } = useAuth();

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
  }, []);

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
      const res = await watchlistService.deleteWatchlist(id);
      const newWatchlists = watchlists.filter(
        (item) => item.movieId !== id && item.userId !== user.id
      );
      updateWatchlists(newWatchlists);
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

  if (!open) {
    return null;
  }

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 backdrop-blur bg-black/50 flex items-center justify-center gap-16 font-sans text-lg z-50'
      onClick={close}
    >
      <div>
        <div onClick={(e) => e.stopPropagation()} className='relative fadein'>
          <div className='w-[320px] p-3 absolute top-0 bottom-0 opacity-0 hover:opacity-100 hover:backdrop-blur hover:bg-black/30 transition-all'>
            <div className='text-3xl mt-16 text-white text-center'>{title}</div>
            <div className=' text-slate-300 mt-5 text-center'>
              {description}
            </div>
          </div>
          <img src={coverImage} className='h-120 w-80 object-cover' alt='' />

          {user?.role === 'ADMIN' ? (
            <button
              onClick={handleDelete}
              className='bg-red-500 h-10 w-10 text-white absolute top-2 right-2 rounded-full opacity-70 hover:opacity-100'
            >
              X
            </button>
          ) : (
            ''
          )}
        </div>
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
      </div>
      <div
        className='p-5 w-[500px] rounded-lg flex flex-col justify-end fadein'
        onClick={(e) => e.stopPropagation()}
      >
        <CommentContainer movieId={id} movieModalClose={close} />
      </div>
    </div>
  );
}

export default MovieModal;
