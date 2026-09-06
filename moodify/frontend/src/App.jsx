import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./features/shared/style/gloabal.scss";
import { AuthProvider } from "./features/auth/auth.content";

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
