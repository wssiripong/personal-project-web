import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import MovieContainer from '../components/MovieContainer';
import { useAuth } from '../context/AuthContext';
import { useMovie } from '../context/MovieContext';
import AddMovie from '../features/AddMovie';
import Login from '../features/Login';
import Register from '../features/Register';

function Home() {
  const [openLogin, setOpenLogin] = useState(true);
  const [openRegister, setOpenRegister] = useState(false);

  const { user } = useAuth();

  const { openAddMovie, toggleAddMovie } = useMovie();

  useEffect(() => {
    if (user) {
      setOpenLogin(false);
      setOpenRegister(false);
    }
    if (!user) {
      setOpenLogin(true);
    }
  }, [user]);

  return (
    <div className='p-10'>
      <MovieContainer />
      <Modal
        title='Login'
        body={
          <Login
            openRegister={() => setOpenRegister(true)}
            closeLogin={() => setOpenLogin(false)}
          />
        }
        open={openLogin}
      />
      <Modal
        title='Register'
        body={
          <Register
            closeRegister={() => setOpenRegister(false)}
            openLogin={() => setOpenLogin(true)}
          />
        }
        open={openRegister}
      />
      <Modal
        title='Add Movie'
        open={openAddMovie}
        body={<AddMovie />}
        close={toggleAddMovie}
      />
    </div>
  );
}

export default Home;
