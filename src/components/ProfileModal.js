import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as userServicec from '../api/userApi';
import Avatar from './Avatar';
import { useLoading } from '../context/LoadingContext';

function ProfileModal({ open, close }) {
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState({});
  const { user, getMe } = useAuth();
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
      await userServicec.updateUser(formData);
      await getMe();
      setEdit(false);
      stopLoading();
    } catch (err) {
      console.log(err);
    }
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6 text-teal-500 cursor-pointer'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z'
                />
              </svg>
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
        <div className='border-2 w-80 my-3'></div>
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
            />
          </svg>
        </button>
        {edit && (
          <button
            className='absolute top-3 right-14'
            onClick={() => updateUser(editInput)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileModal;
