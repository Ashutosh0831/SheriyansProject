import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {

  const navigate = useNavigate()

  const {loading,handleRegister} = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

 async function handleForm(e) {
    e.preventDefault();

    const user_registered = await handleRegister({ name, username, email, password })
    console.log(user_registered)

    if(user_registered){
      navigate("/login")
      return 
    }

    setName("")
    setUsername("")
    setEmail("")
    setPassword(" ")

  }

  if(loading){
      return <main><h1>Loading...</h1></main>
    }

  return (
    <>
      <main>
        <div className="form-content">
          <h1>Register</h1>
          <form onSubmit={handleForm} className="form">
            <input
              type="text"
              value={name}
              onChange={(val) => {
                setName(val.target.value);
              }}
              className="name"
              placeholder="Full Name"
            />
            <input
              type="text"
              value={username}
              onChange={(val) => {
                setUsername(val.target.value);
              }}
              className="username"
              placeholder="username"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(val) => {
                setEmail(val.target.value);
              }}
              className="email"
              placeholder="abcd@gmail.com"
            />
            <input
              type="password"
              value={password}
              onChange={(val) => {
                setPassword(val.target.value);
              }}
              className="password"
              required
            />
            <button>Register</button>
            <p>
              Already account ?
              <Link className="togle-btn" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
