import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import Login from '../features/Login';
import Register from '../features/Register';

function Home() {
  const [openLogin, setOpenLogin] = useState(true);
  const [openRegister, setOpenRegister] = useState(false);

  const { user } = useAuth();

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
    <>
      <div className='bg-blue-300'>This is Home page</div>
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
    </>
  );
}

export default Home;
