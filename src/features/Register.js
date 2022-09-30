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

  const handleRegisterSubmit = async () => {
    try {
      await register(registerUser);
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
      <div className='flex flex-col gap-3'>
        <div className='flex justify-center'>
          <input
            value={registerUser.username}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, username: e.target.value })
            }
            placeholder='username'
            className='text-center focus:outline-sky-500 h-8 w-full'
          />
        </div>
        <div className='flex justify-center'>
          <input
            value={registerUser.password}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, password: e.target.value })
            }
            placeholder='password'
            className='text-center focus:outline-sky-500 h-8 w-full'
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
            className='text-center focus:outline-sky-500 h-8 w-full'
          />
        </div>
        <div className='flex justify-center'>
          <input
            value={registerUser.firstName}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, firstName: e.target.value })
            }
            placeholder='first name'
            className='text-center focus:outline-sky-500 h-8 w-full'
          />
        </div>
        <div className='flex justify-center'>
          <input
            value={registerUser.lastName}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, lastName: e.target.value })
            }
            placeholder='last name'
            className='text-center focus:outline-sky-500 h-8 w-full'
          />
        </div>
        <div className='flex justify-center'>
          <input
            value={registerUser.email}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, email: e.target.value })
            }
            placeholder='email'
            className='text-center focus:outline-sky-500 h-8 w-full'
          />
        </div>
        <div
          className='bg-blue-500 p-3 text-center mt-3 cursor-pointer'
          onClick={handleRegisterSubmit}
        >
          <button>Register</button>
        </div>
        <div
          className='bg-green-500 p-3 text-center cursor-pointer'
          onClick={handleReturnLogin}
        >
          <button>Already Have An Account</button>
        </div>
      </div>
    </>
  );
}

export default Register;
