import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../node_modules/flowbite/dist/flowbite.min.js";
import Default from "./components/atoms/DefaultTab.js";
import Security from "./components/atoms/SecurityTab.js";
import NavBar from "./components/widgets/NavBar";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import NewPassword from "./pages/NewPassword.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import Register from "./pages/Register.js";
import ResetRequest from "./pages/ResetRequest.js";
import GlobalContext from "./utils/globalContext.js";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<any>(null);
  // useEffect(() => {
  //   if (localStorage.getItem("user") && localStorage.getItem("token")) {
  //     if (!localStorage.getItem("expireTime")) {
  //       localStorage.setItem(
  //         "expireTime",
  //         JSON.stringify(Date.now() + 60 * 60 * 1000)
  //       );
  //     }

  //     if (Date.now() >= +localStorage?.getItem("expireTime")!) {
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("expireTime");
  //       location.href = "/login";
  //     }
  //   }
  // });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <div className="bg-[#f7f8fd] min-h-screen min-w-screen ">
            <NavBar />
            <Outlet />
            <ToastContainer />
          </div>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile/*"
          element={user ? <Profile /> : <Navigate to="/login" />}
        >
          <Route path="default" element={<Default />} />
          <Route path="security" element={<Security />} />
        </Route>
        <Route path="/reset" element={<ResetRequest />} />
        <Route path="/new-password/:resetToken" element={<NewPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{
          user: user,
        }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
