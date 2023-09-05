import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
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
import InProgress from "./components/widgets/InProgress.js";
import Live from "./components/widgets/Live.js";
import NavBar from "./components/widgets/NavBar";
import Planned from "./components/widgets/Planned.js";
import Comments from "./pages/Comments.js";
import CreateFeedback from "./pages/CreateFeedback.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import NewPassword from "./pages/NewPassword.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import Register from "./pages/Register.js";
import ResetRequest from "./pages/ResetRequest.js";
import Roadmap from "./pages/Roadmap.js";
import authService from "./services/authService.js";
import homeService from "./services/globalService.js";
import GlobalContext from "./utils/globalContext.js";

function App() {
  const [user, setUser] = useState<any>({});
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("most-upvotes");
  const [expiryTime, setExpiryTime] = useState<number>(
    +(localStorage?.getItem("expiryTime") || 0)
  );

  const { isLoading, isError } = useQuery({
    queryFn: homeService.getFeedbacks,
    queryKey: ["feedbacks", tags, sort],
    onSuccess: ({ data }) => {
      setFeedbacks(data.data);
    },
    onError: (error) => console.log(error),
  });

  const handleTags = (tags: string[]) => {
    setTags(tags);
  };

  const handleSort = (sort: string) => {
    setSort(sort);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const token = authService.getToken();
    const currentTime = new Date().getTime();

    if (token && currentTime > expiryTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expiryTime");
      location.href = "/login";
    } else {
      const timeUntilExpiry = expiryTime - currentTime;
      setTimeout(() => {
        setExpiryTime(+(localStorage.getItem("expiryTime") || 0));
      }, timeUntilExpiry);
    }
  }, [expiryTime]);

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
        <Route path="/roadmap/*" element={<Roadmap />}>
          <Route path="planned" element={<Planned />} />
          <Route path="in-progress" element={<InProgress />} />
          <Route path="live" element={<Live />} />
        </Route>
        <Route path="/feedbacks/:feedbackId" element={<Comments />} />
        <Route
          path="/create-feedback"
          element={user ? <CreateFeedback /> : <Navigate to="/login" />}
        />
        <Route path="/new-password/:resetToken" element={<NewPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <GlobalContext.Provider
      value={{
        user,
        feedbacks: {
          data: feedbacks,
          isError,
          isLoading,
        },
        onTag: handleTags,
        onSort: handleSort,
      }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  );
}

export default App;
