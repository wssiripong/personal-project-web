import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Login({ openRegister, closeLogin }) {
  const [loginUser, setLoginUser] = useState({ username: '', password: '' });

  const { login } = useAuth();

  const handleRegisterOpen = () => {
    closeLogin();
    openRegister();
  };

  const handleLogin = async () => {
    try {
      await login(loginUser);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setLoginUser({ username: '', password: '' });
    }
  };

  return (
    <>
      <div className='flex flex-col gap-3'>
        <div className='flex justify-center'>
          <input
            value={loginUser.username}
            onChange={(e) =>
              setLoginUser({ ...loginUser, username: e.target.value })
            }
            placeholder='username'
            className='text-center focus:outline-sky-500 h-8 w-full'
          />
        </div>
        <div className='flex justify-center'>
          <input
            value={loginUser.password}
            onChange={(e) =>
              setLoginUser({ ...loginUser, password: e.target.value })
            }
            placeholder='password'
            className='text-center focus:outline-sky-500 h-8 w-full'
          />
        </div>
        <div
          className='bg-blue-500 p-3 text-center mt-3 cursor-pointer'
          onClick={handleLogin}
        >
          <button>Login</button>
        </div>
        <div
          className='bg-green-500 p-3 text-center cursor-pointer'
          onClick={handleRegisterOpen}
        >
          <button>Register Account</button>
        </div>
      </div>
    </>
  );
}

export default Login;
