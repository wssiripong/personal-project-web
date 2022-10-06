import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../api/authApi';
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken
} from '../utils/localStorage';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (getAccessToken()) {
          await getMe();
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMe();
  }, []);

  const getUser = async (userId) => {
    try {
      const res = await authService.getUser(userId);
      return res.data.user;
    } catch (err) {
      console.log(err);
    }
  };

  const getMe = async () => {
    const res = await authService.getMe();
    setUser(res.data.user);
  };

  const register = async (input) => {
    const res = await authService.register(input);
    addAccessToken(res.data.token);
    getMe();
  };

  const login = async (input) => {
    const res = await authService.login(input);
    addAccessToken(res.data.token);
    await getMe();
  };

  const logout = () => {
    setUser(null);
    removeAccessToken();
  };

  const toggleLogin = () => {
    setOpenLogin((prev) => !prev);
  };

  const toggleRegister = () => {
    setOpenRegister((prev) => !prev);
  };

  const toggleProfileModal = () => {
    setOpenProfileModal((prev) => !prev);
  };
  return (
    <AuthContext.Provider
      value={{
        openLogin,
        openRegister,
        toggleLogin,
        toggleRegister,
        register,
        login,
        user,
        logout,
        getUser,
        getMe,
        openProfileModal,
        toggleProfileModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
