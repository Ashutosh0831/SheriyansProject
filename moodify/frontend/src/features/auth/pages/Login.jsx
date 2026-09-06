import FormGroup from "../components/FormGroup"
import { Link } from "react-router"
import { useState } from "react"
import "../css/FormGroup.scss"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"


const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {loading, handleLogin} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        await handleLogin({username, password})
        navigate("/")
    }

  return (
    <>
    <main className="FormContainer">
        <div className="form-box">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>

                <FormGroup type="text"
                value={username}
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
                label="Username"
                placeholder="username"
                />

                <FormGroup type="password"
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                label="Password"
                placeholder="* * * * * * *"
                />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register" className="link">Register</Link></p>
        </div>
    </main>
    </>
  )
}

export default Login
