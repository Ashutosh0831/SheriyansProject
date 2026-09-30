import "../style/form.scss";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {

  const navigate = useNavigate();

  const {loading, handleLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();

  const handleForm = async (e) => {
    e.preventDefault();

    const isUser = await handleLogin({ username, password });

    if(isUser){
      navigate("/")
      return 
    }
    
    setUsername("")
    setPassword(null)
  };

  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }
  return (
    <>
      <main>
        <div className="form-content">
          <h1>Login</h1>
          <form onSubmit={handleForm} className="form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e)=>{
                setUsername(e.target.value)
              }}
              className="username"
              placeholder="username"
            />
            <label htmlFor="password"></label>
            <input
              type="password"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              className="password"
              placeholder="password"
            />
            <button>Login</button>
            <p>
              Register yourself ?{" "}
              <Link className="togle-btn" to="/register">
                Register
              </Link>{" "}
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
