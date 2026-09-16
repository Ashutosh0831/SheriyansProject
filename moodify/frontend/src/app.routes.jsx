import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Home from "./features/Home/pages/Home"
import Logout from "./features/auth/pages/Logout"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/logout",
        element: <Logout />
    }
])