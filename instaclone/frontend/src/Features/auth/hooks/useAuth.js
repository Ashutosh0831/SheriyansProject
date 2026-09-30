import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, loading, setUser, setLoading } = context;

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    try {
      const response = await login({ username, password });
      console.log(response);

      if (response && response.user) {
        setUser(response.user);
        return true;
      } else {
        console.error("No user returned from login response:", response);
        return false;
      }
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, username, email, password }) => {
    setLoading(true);

    try {
      const response = await register({ name, username, email, password });
      setUser(response.user);
      return true
    } catch (err) {
      console.log(err.response.data);
      return false
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin, handleRegister };
};
