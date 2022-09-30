import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className='fixed top-0 left-0 right-0 bg-yellow-500 h-16'>
      <div className='flex justify-between items-center h-full text-white'>
        {user?.role === 'ADMIN' ? (
          <div className='text-2xl pl-3 cursor-pointer'>Add Movie</div>
        ) : (
          <div></div>
        )}
        <div>
          {user && (
            <div className='text-2xl pr-3 cursor-pointer' onClick={logout}>
              Log out
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
