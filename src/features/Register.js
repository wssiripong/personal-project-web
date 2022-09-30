import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Register({ closeRegister, openLogin }) {
  const [registerUser, setRegisterUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const { register } = useAuth();

  const handleRegisterSubmit = async (e) => {
    try {
      e.preventDefault();
      await register(registerUser);
      toast.success('register successful');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleReturnLogin = () => {
    closeRegister();
    openLogin();
  };

  return (
    <>
      <form onSubmit={handleRegisterSubmit}>
        <div className='flex flex-col gap-3 p-3'>
          <div className='flex justify-center'>
            <input
              value={registerUser.username}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, username: e.target.value })
              }
              placeholder='username'
              className='h-10 w-full text-center outline-blue-500'
            />
          </div>
          <div className='flex justify-center'>
            <input
              value={registerUser.password}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, password: e.target.value })
              }
              placeholder='password'
              className='h-10 w-full text-center outline-blue-500'
            />
          </div>
          <div className='flex justify-center'>
            <input
              value={registerUser.confirmPassword}
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  confirmPassword: e.target.value
                })
              }
              placeholder='confirm password'
              className='h-10 w-full text-center outline-blue-500'
            />
          </div>
          <div className='flex justify-center'>
            <input
              value={registerUser.firstName}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, firstName: e.target.value })
              }
              placeholder='first name'
              className='h-10 w-full text-center outline-blue-500'
            />
          </div>
          <div className='flex justify-center'>
            <input
              value={registerUser.lastName}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, lastName: e.target.value })
              }
              placeholder='last name'
              className='h-10 w-full text-center outline-blue-500'
            />
          </div>
          <div className='flex justify-center'>
            <input
              value={registerUser.email}
              onChange={(e) =>
                setRegisterUser({ ...registerUser, email: e.target.value })
              }
              placeholder='email'
              className='h-10 w-full text-center outline-blue-500'
            />
          </div>
          <button className='bg-green-500 w-full h-10 text-lg text-white'>
            Register
          </button>
          <button
            type='button'
            onClick={handleReturnLogin}
            className='bg-blue-500 w-full h-10 text-lg text-white'
          >
            Already Have An Account
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
