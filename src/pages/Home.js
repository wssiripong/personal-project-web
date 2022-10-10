import Modal from '../components/Modal';
import MovieContainer from '../components/MovieContainer';
import ProfileModal from '../components/ProfileModal';
import SearchModal from '../components/SearchModal';
import { useAuth } from '../context/AuthContext';
import { useMovie } from '../context/MovieContext';
import AddMovie from '../features/AddMovie';
import Login from '../features/Login';
import Register from '../features/Register';

function Home() {
  const {
    openLogin,
    openRegister,
    toggleLogin,
    toggleRegister,
    toggleProfileModal,
    openProfileModal
  } = useAuth();

  const { openAddMovie, toggleAddMovie, search, toggleSearch } = useMovie();

  return (
    <div className='flex justify-center items-center h-screen bg-teal-800'>
      <div className='container h-full py-10 px-10'>
        <MovieContainer />
        <Modal
          title='Login'
          body={
            <Login toggleLogin={toggleLogin} toggleRegister={toggleRegister} />
          }
          open={openLogin}
          close={toggleLogin}
        />
        <Modal
          title='Register'
          body={
            <Register
              toggleLogin={toggleLogin}
              toggleRegister={toggleRegister}
            />
          }
          open={openRegister}
          close={toggleRegister}
        />
        <Modal
          title='Add Movie'
          open={openAddMovie}
          body={<AddMovie />}
          close={toggleAddMovie}
        />
        <ProfileModal open={openProfileModal} close={toggleProfileModal} />
        <SearchModal open={search} close={toggleSearch} />
      </div>
    </div>
  );
}

export default Home;
