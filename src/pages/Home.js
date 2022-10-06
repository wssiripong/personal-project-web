import Modal from '../components/Modal';
import MovieContainer from '../components/MovieContainer';
import ProfileModal from '../components/ProfileModal';
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

  const { openAddMovie, toggleAddMovie } = useMovie();

  return (
    <div className=' bg-teal-800 h-[100vh] flex justify-center items-center'>
      <div className='w-[200vh] h-[100vh] p-10'>
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
      </div>
    </div>
  );
}

export default Home;
