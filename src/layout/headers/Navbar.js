import Avatar from '../../components/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useMovie } from '../../context/MovieContext';

function Navbar() {
  const { user, logout, toggleLogin, toggleProfileModal } = useAuth();
  const { toggleAddMovie } = useMovie();

  return (
    <div className='fixed top-0 left-0 w-[250px] bottom-0 bg-teal-900 p-5 shadow-md border-r-teal-700 border-r-2'>
      <div className='text-teal-300 p-5 flex flex-col items-center gap-3 font-bangers text-lg'>
        <div className='text-4xl text-blue-300'>SCREENTALK</div>
        <div className='border-[1px] border-teal-700 w-full my-3'></div>
        <div className='hover:scale-125'>
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
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </div>
        <div className='cursor-pointer hover:scale-125'>Action</div>
        <div className='cursor-pointer hover:scale-125'>Anime</div>
        <div className='cursor-pointer hover:scale-125'>Comedy</div>
        <div className='cursor-pointer hover:scale-125'>Crime</div>
        <div className='cursor-pointer hover:scale-125'>Documentary</div>
        <div className='cursor-pointer hover:scale-125'>Drama</div>
        <div className='cursor-pointer hover:scale-125'>Family</div>
        <div className='cursor-pointer hover:scale-125'>Fantasy</div>
        <div className='cursor-pointer hover:scale-125'>Horror</div>
        <div className='cursor-pointer hover:scale-125'>Romance</div>
        <div className='cursor-pointer hover:scale-125'>Thiller</div>
        <div className='cursor-pointer hover:scale-125'>TV shows</div>
        <div className='border-[1px] border-teal-700 w-full my-3'></div>
        {user && (
          <div
            onClick={toggleProfileModal}
            className='cursor-pointer w-[80px] h-[80px]'
          >
            <Avatar size='80' src={user.profileImage} />
          </div>
        )}
      </div>
      <div className='h-full text-white flex justify-evenly'>
        {user?.role === 'ADMIN' ? (
          <div className='text-2xl cursor-pointer' onClick={toggleAddMovie}>
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
                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
        ) : (
          ''
        )}
        <div>
          {user ? (
            <div className='text-2xl cursor-pointer' onClick={logout}>
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
                  d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
                />
              </svg>
            </div>
          ) : (
            <div className='text-2xl cursor-pointer' onClick={toggleLogin}>
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
                  d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
