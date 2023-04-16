import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/profile") {
      navigate("/profile/default");
    }
  }, [navigate]);

  return (
    <div className="flex">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex absolute z-50 items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="shadow md:sticky md:top-[80px] left-0 fixed md:z-0 z-50 w-64 h-screen md:h-[calc(100vh-80px)] transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="px-3 py-4 overflow-y-auto h-full bg-gray-50">
          <ul className="space-y-2 font-medium mt-6">
            <li>
              <NavLink
                to="/profile/default"
                className="flex items-center p-2 duration-150 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Default</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/security"
                className="flex items-center p-2 duration-150 text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <span className="ml-3">Security</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex-1 flex justify-center items-start z-10 my-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
