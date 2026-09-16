import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import "./features/shared/style/gloabal.scss";
import { AuthProvider } from "./features/auth/auth.content";
import { SongContextProvider } from "./features/Home/song.context";





const App = () => {
  return (
    <>

      <AuthProvider>
        <SongContextProvider>
          <RouterProvider router={router} />
        </SongContextProvider>     
      </AuthProvider>
    </>
  );
};

export default App;
