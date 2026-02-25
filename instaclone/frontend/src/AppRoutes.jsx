import { BrowserRouter ,Routes, Route} from "react-router-dom";
import LoginForm from "./Features/auth/pages/loginForm";
import RegisterForm from "./Features/auth/pages/registerForm";


function AppRoutes(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path = '/login' element = {<LoginForm />} />
            <Route path = '/register' element = {<RegisterForm/>}/>
        </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes
