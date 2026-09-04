import { createBrowserRouter } from "react-router";
import Login from "./Features/auth/pages/Login";
import Register from "./Features/auth/pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Welcome to home</h1>
    },

    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element:<Register/>
    }
])

export default router