import { useContext } from "react";
import AuthContext from "../auth.content";
import { login, register, getUser, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading, message, setMessage } = context;

  async function handleRegister({ name, username, email, password, confirmpassword }) {
    setLoading(true);
    try {
      const data = await register({ name, username, email, password, confirmpassword });
      setUser(data.user);
      setMessage(data?.message)
    }catch(err){
      setMessage(err?.response?.data?.message)}
      finally {
      setLoading(false);
    }
  }

  async function handleLogin({ username, email, password }) {
    setLoading(true);
    try {
      const data = await login({ username, email, password });
      if (data?.user) {
        setUser(data.user);
        setMessage(data.message);
      } else {
        const userData = await getUser();
        setUser(userData?.user || null);
        setMessage(data.message)
      }
      return true;
    } catch(err){
      setMessage(err?.response?.data?.message)
      return false;
    }finally {
      setLoading(false);
    }
  }

  async function handleUser() {
    setLoading(true);
    try{
      const data = await getUser();
    setUser(data.user);
    setMessage(data?.message)
    }catch(err){
      setMessage(err?.response?.data?.message)
    }finally{
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    await logout();
    setUser(null);
    setLoading(false);
  }

  return {
    user,
    loading,
    message,
    handleRegister,
    handleLogin,
    handleUser,
    handleLogout,
  };
};
