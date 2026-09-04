import { useState } from "react";
import FormGroup from "../components/FormGroup";
import "../shared/css/Form.css"
import { Link } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router";


const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate()

  const {loading,handleLogin} = useAuth()

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({username, password})
    navigate("/")
  }
  return (
    <>

    <main className="login-container">
        <h1>Login Form</h1>
      <form className="Form-container" onSubmit={handleSubmit}>
        <FormGroup
          type="text"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
          label="username "
          placeholder="username"
        />

        <FormGroup
          type="password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          label="password "
          placeholder="* * * * * * * *"
        />

        <button type="submit">Login</button>
      </form>
      <p>Don't have account? <Link className="link" to="/register">Regsiter here</Link></p>
    </main>

    </>
  );
};

export default Login;
