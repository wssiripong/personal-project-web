import { useAuth } from '../../context/AuthContext';
import { useMovie } from '../../context/MovieContext';

function Navbar() {
  const { user, logout } = useAuth();
  const { toggleAddMovie } = useMovie();

  return (
    <div className='fixed top-0 left-0 w-[250px] bottom-0 bg-teal-900 p-5 shadow-md border-r-teal-700 border-r-2'>
      <div className='h-full text-white'>
        {user?.role === 'ADMIN' ? (
          <div className='text-2xl cursor-pointer' onClick={toggleAddMovie}>
            Add Movie
          </div>
        ) : (
          <div></div>
        )}
        <div>
          {user && (
            <div className='text-2xl cursor-pointer' onClick={logout}>
              Log out
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
