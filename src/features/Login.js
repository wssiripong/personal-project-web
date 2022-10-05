import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Login({ toggleLogin, toggleRegister }) {
  const [loginUser, setLoginUser] = useState({ username: '', password: '' });

  const { login } = useAuth();

  const handleRegisterOpen = () => {
    toggleLogin();
    toggleRegister();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(loginUser);
      toggleLogin();
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoginUser({ username: '', password: '' });
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className='flex flex-col gap-3 items-center p-3'>
          <div className='w-full'>
            <input
              value={loginUser.username}
              onChange={(e) =>
                setLoginUser({
                  ...loginUser,
                  username: e.target.value
                })
              }
              className='h-10 w-full text-center outline-blue-500'
              placeholder='username'
            />
          </div>
          <div className='w-full'>
            <input
              value={loginUser.password}
              onChange={(e) =>
                setLoginUser({ ...loginUser, password: e.target.value })
              }
              className='h-10 w-full text-center outline-blue-500'
              placeholder='password'
            />
          </div>
          <button className='bg-blue-500 w-full h-10 text-lg text-white'>
            Login
          </button>
          <button
            type='button'
            onClick={handleRegisterOpen}
            className='bg-green-500 w-full h-10 text-lg text-white'
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
