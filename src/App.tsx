import { QueryClient, QueryClientProvider } from "react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "../node_modules/flowbite/dist/flowbite.min.js";
import NavBar from "./components/widgets/NavBar";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import NotFound from "./pages/NotFound.js";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <div className="bg-[#f7f8fd] min-h-screen min-w-screen ">
          <NavBar />
          <Outlet />
        </div>
      }
    >
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
