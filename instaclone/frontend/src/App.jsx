import { RouterProvider } from "react-router"
import {AppRoutes} from "./app.routes"
import "./Features/shared/global.scss"
import { AuthProvider } from "./Features/auth/auth.context"
import Story from "../src/Features/Components/Story"


const App = () => {
  
  return (
    <>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    </>
  )
}

export default App
