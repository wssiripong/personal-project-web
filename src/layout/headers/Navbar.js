import Avatar from '../../components/Avatar';
import SearchIcon from '../../components/svg/SearchIcon';
import { useAuth } from '../../context/AuthContext';
import { useMovie } from '../../context/MovieContext';
import {
  CATEGORY_ACTION,
  CATEGORY_ANIME,
  CATEGORY_COMEDY,
  CATEGORY_CRIME,
  CATEGORY_DOCUMENTARY,
  CATEGORY_DRAMA,
  CATEGORY_FAMILY,
  CATEGORY_FANTASY,
  CATEGORY_HORROR,
  CATEGORY_ROMANCE,
  CATEGORY_THRILLER,
  CATEGORY_TV_SHOWS
} from '../../config/constants';
import PlusIcon from '../../components/svg/PlusIcon';
import LogoutIcon from '../../components/svg/LogoutIcon';
import PersonIcon from '../../components/svg/PersonIcon';

function Navbar() {
  const { user, logout, toggleLogin, toggleProfileModal } = useAuth();
  const { toggleAddMovie, selectCategory, category, toggleSearch } = useMovie();

  return (
    <div className='fixed top-0 left-0 w-[250px] bottom-0 bg-teal-900 p-5 shadow-md border-r-teal-700 border-r-2'>
      <div className='text-teal-300 p-5 flex flex-col items-center gap-3 font-bangers text-lg'>
        <div className='text-4xl bg-blue-500 text-white'>SCREENTALK</div>
        <div className='border-[1px] border-teal-700 w-full my-3'></div>
        <div onClick={toggleSearch} className='hover:scale-125'>
          <SearchIcon />
        </div>
        <div
          onClick={
            category === CATEGORY_ACTION
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_ACTION)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_ACTION ? 'text-yellow-500' : ''
          }`}
        >
          Action
        </div>
        <div
          onClick={
            category === CATEGORY_ANIME
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_ANIME)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_ANIME ? 'text-yellow-500' : ''
          }`}
        >
          Anime
        </div>
        <div
          onClick={
            category === CATEGORY_COMEDY
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_COMEDY)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_COMEDY ? 'text-yellow-500' : ''
          }`}
        >
          Comedy
        </div>
        <div
          onClick={
            category === CATEGORY_CRIME
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_CRIME)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_CRIME ? 'text-yellow-500' : ''
          }`}
        >
          Crime
        </div>
        <div
          onClick={
            category === CATEGORY_DOCUMENTARY
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_DOCUMENTARY)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_DOCUMENTARY ? 'text-yellow-500' : ''
          }`}
        >
          Documentary
        </div>
        <div
          onClick={
            category === CATEGORY_DRAMA
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_DRAMA)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_DRAMA ? 'text-yellow-500' : ''
          }`}
        >
          Drama
        </div>
        <div
          onClick={
            category === CATEGORY_FAMILY
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_FAMILY)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_FAMILY ? 'text-yellow-500' : ''
          }`}
        >
          Family
        </div>
        <div
          onClick={
            category === CATEGORY_FANTASY
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_FANTASY)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_FANTASY ? 'text-yellow-500' : ''
          }`}
        >
          Fantasy
        </div>
        <div
          onClick={
            category === CATEGORY_HORROR
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_HORROR)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_HORROR ? 'text-yellow-500' : ''
          }`}
        >
          Horror
        </div>
        <div
          onClick={
            category === CATEGORY_ROMANCE
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_ROMANCE)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_ROMANCE ? 'text-yellow-500' : ''
          }`}
        >
          Romance
        </div>
        <div
          onClick={
            category === CATEGORY_THRILLER
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_THRILLER)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_THRILLER ? 'text-yellow-500' : ''
          }`}
        >
          Thiller
        </div>
        <div
          onClick={
            category === CATEGORY_TV_SHOWS
              ? () => selectCategory('')
              : () => selectCategory(CATEGORY_TV_SHOWS)
          }
          className={`cursor-pointer hover:scale-125 ${
            category === CATEGORY_TV_SHOWS ? 'text-yellow-500' : ''
          }`}
        >
          TV shows
        </div>
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
            <PlusIcon />
          </div>
        ) : (
          ''
        )}
        <div>
          {user ? (
            <div className='text-2xl cursor-pointer' onClick={logout}>
              <LogoutIcon />
            </div>
          ) : (
            <div className='text-2xl cursor-pointer' onClick={toggleLogin}>
              <PersonIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
