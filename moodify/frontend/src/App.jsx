// import Expression from "./Features/Expression/Expression"
import { RouterProvider } from "react-router";
import router from "./App.routes";
import { AuthProvider } from "./Features/auth/auth.context";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      
      {/* <Expression /> */}
    </div>
  );
};

export default App;
