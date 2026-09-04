import { useState } from "react";
import FormGroup from "../components/FormGroup";
import "../shared/css/Form.css"
import { Link } from "react-router";
import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const [Fullname, setFullname] = useState("");
  const [gender, setgender] = useState("");
  const [adress, setadress] = useState("");
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const {loading,handleRegister} = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister({username, email, password})
    navigate("/login")
  }
  return (
    <>
    <main className="register-container">
        <h1>Register Form</h1>
      <form className="Form-container" onSubmit={handleSubmit}>
        <FormGroup
          type="text"
          value={Fullname}
          onChange={(e) => {
            setFullname(e.target.value);
          }}
          label="Full Name"
          placeholder="Full Name"
        />

        <FormGroup
          type="text"
          value={adress}
          onChange={(e) => {
            setadress(e.target.value);
          }}
          label="Adress"
          placeholder="Adress...."
        />

        <FormGroup 
        type="text"
        value={gender}
        onChange={(e)=>{
            setgender(e.target.value)
        }}
        label="Gender"
        placeholder="Male/Female"
        />

        <FormGroup
        type="email"
        value={email}
        onChange={(e)=>{
            setemail(e.target.value)
        }}
        label="Email"
        placeholder="jhon@gmail.com"/>

        <FormGroup
        type="text"
        value={username}
        onChange={(e)=>{
            setusername(e.target.value)
        }}
        label="Username"
        placeholder="username"/>

        <FormGroup
        type="password"
        value={password}
        onChange={(e)=>{
            setpassword(e.target.value)
        }}
        label="Password"
        placeholder="* * * * * * * *"/>

        <FormGroup
        type="password"
        value={confirmpassword}
        onChange={(e)=>{
            setconfirmpassword(e.target.value)
        }}
        label="Confirm Password"
        placeholder="* * * * * * * *"/>

        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link className="link" to="/login">Login</Link></p>
    </main>
    </>
  );
};

export default Register;
