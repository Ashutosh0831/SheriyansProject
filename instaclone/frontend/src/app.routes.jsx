import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Features/auth/pages/LoginForm"
import Register from "./Features/auth/pages/RegisterForm"
import Home from "./Features/auth/pages/Home";



export function AppRoutes(){
    return (
        <BrowserRouter>
           <Routes>
               <Route path="/" element = {<Home/>}/>
               <Route path="/login" element ={<Login />}/>
               <Route path="/register" element = { <Register/>} />
           </Routes>
        </BrowserRouter>
    )
}

