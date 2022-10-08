import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as userService from '../api/userApi';
import * as watchlistService from '../api/watchlistApi';
import Avatar from './Avatar';
import { useLoading } from '../context/LoadingContext';
import SaveIcon from './svg/SaveIcon';
import PhotoIcon from './svg/PhotoIcon';
import EditIcon from './svg/EditIcon';
import { useMovie } from '../context/MovieContext';
import MovieModal from './MovieModal';

function ProfileModal({ open, close }) {
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null
  });
  const [isOpen, setIsOpen] = useState(false);
  const [pick, setPick] = useState({});
  const { user, getMe } = useAuth();
  const { movies } = useMovie();
  const { loading, startLoading, stopLoading } = useLoading();
  const selectFileEl = useRef();

  const updateUser = async (input) => {
    try {
      startLoading();
      const formData = new FormData();
      if (input.firstName) {
        formData.append('firstName', input.firstName);
      }
      if (input.lastName) {
        formData.append('lastName', input.lastName);
      }
      if (input.email) {
        formData.append('email', input.email);
      }
      if (input.profileImage) {
        formData.append('profileImage', input.profileImage);
      }
      await userService.updateUser(formData);
      await getMe();
      setEdit(false);
      stopLoading();
    } catch (err) {
      console.log(err);
    }
  };

  const viewMovie = (input) => {
    setPick(input);
    setIsOpen(true);
  };

  if (!open) {
    return null;
  }
  return (
    <div
      className='fixed top-0 bottom-0 right-0 left-0 backdrop-blur flex flex-col items-center justify-center'
      onClick={() => {
        setEdit(false);
        setEditInput({});
        close();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='z-10 relative fadein'
      >
        <Avatar src={user?.profileImage} size='150' />
        {edit && (
          <div>
            <div className='absolute top-0 left-0 h-[150px] w-[150px] backdrop-blur-3xl rounded-full'></div>
            <div
              onClick={() => selectFileEl.current.click()}
              className='absolute top-[70px] right-[63px]'
            >
              <PhotoIcon />
            </div>
            <input
              type='file'
              className='hidden'
              ref={selectFileEl}
              onChange={(e) =>
                setEditInput({ ...editInput, profileImage: e.target.files[0] })
              }
            />
          </div>
        )}
      </div>
      <div
        className='bg-teal-500 p-5 rounded-lg text-white font-bangers text-3xl -mt-14 pt-[70px] relative fadein'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex gap-5 justify-center'>
          {edit ? (
            <input
              type='text'
              value={editInput.firstName}
              onChange={(e) =>
                setEditInput({ ...editInput, firstName: e.target.value })
              }
              placeholder={user.firstName}
              className='w-36 p-2 text-base font-sans text-center text-black outline-blue-500 rounded-lg'
            />
          ) : (
            <div>{user.firstName}</div>
          )}
          {edit ? (
            <input
              type='text'
              value={editInput.lastName}
              onChange={(e) =>
                setEditInput({ ...editInput, lastName: e.target.value })
              }
              placeholder={user.lastName}
              className='w-36 p-2 text-base font-sans text-center text-black outline-blue-500 rounded-lg'
            />
          ) : (
            <div>{user.lastName}</div>
          )}
        </div>
        <div className='border-2 w-full my-3'></div>
        {edit ? (
          <input
            type='text'
            placeholder={user.email}
            className='w-80 p-2 text-base font-sans text-center text-black outline-blue-500 rounded-lg'
          />
        ) : (
          <div className='text-center'>{user.email}</div>
        )}
        <button
          onClick={() => {
            setEdit((prev) => !prev);
            setEditInput({});
          }}
          className='absolute top-3 right-3'
        >
          <EditIcon />
        </button>
        {edit && (
          <button
            className='absolute top-3 right-14'
            onClick={() => updateUser(editInput)}
          >
            <SaveIcon />
          </button>
        )}
        <div className='flex flex-wrap justify-center max-w-[600px] gap-3 font-sans text-sm'>
          {movies.map((item) => {
            if (item.Watchlists.find((s) => s.userId === user.id)) {
              return (
                <div
                  className='mt-5 h-[135px] w-[90px] shadow-2xl hover:scale-110 transition-all ease-in-out relative'
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
          })}
          <MovieModal
            open={isOpen}
            movieInfo={pick}
            close={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
