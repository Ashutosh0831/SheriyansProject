import FormGroup from "../components/FormGroup"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router"
import "../css/FormGroup.scss"
import { useAuth } from "../hooks/useAuth"


const Register = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")

    const navigate = useNavigate()
    const {loading, handleRegister} = useAuth()

    async function handleSubmit(e){
        e.preventDefault()
        await handleRegister({name, username, email, password, confirmpassword})
        navigate("/login")
    }
    
  return (
    <>
    <main className="FormContainer">
        <div className="form-box">
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit}>
            <FormGroup type="text" value={name} onChange={(e)=>{
                setName(e.target.value)
            }}
            label="Name "
            placeholder="Full Name"
            />

            <FormGroup type="text"
            value={username}
            onChange={(e)=>{
                setUsername(e.target.value)
            }}
            label="Username "
            placeholder="username"
            />

            <FormGroup type="email"
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            label="Email "
            placeholder="jhon@gmail.com"/>

            <FormGroup type="password"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            label="Password "
            placeholder="* * * * * * * *"/>

            <FormGroup type="password"
            value={confirmpassword}
            onChange={(e)=>{
                setConfirmpassword(e.target.value)
            }}
            label="Confirm Password "
            placeholder="* * * * * * * *"/>

            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login" className="link">Login</Link></p>
</div>
        
        </main></>
  )
}

export default Register
