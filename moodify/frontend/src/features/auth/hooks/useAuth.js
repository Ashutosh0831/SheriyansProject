import { useContext } from "react";
import AuthContext from "../auth.content";
import { login, register, getUser, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ name, username, email, password, confirmpassword }) {
    setLoading(true);
    try {
      const data = await register({ name, username, email, password, confirmpassword });
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ username, email, password }) {
    setLoading(true);
    const data = await login({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }

  async function handleUser() {
    setLoading(true);
    const data = await getUser();
    setUser(data.user);
    setLoading(false);
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
    handleRegister,
    handleLogin,
    handleUser,
    handleLogout,
  };
};
