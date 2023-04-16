import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
interface Props {
  name: string;
  email: string;
  image: string;
}

const UserMenu = ({ name, email, image }: Props) => {
  const mutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      authService.removeToken();
      // localStorage.removeItem("user");
      // localStorage.removeItem("token");
      // localStorage.removeItem("expireTime");
      location.href = "/";
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex items-center justify-center md:order-2 mt-3 md:mt-0">
      <button
        type="button"
        className="flex mr-3 text-sm w-12 h-12 overflow-hidden bg-gray-800 rounded-full md:mr-0"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="hidden sr-only">Open user menu</span>
        <img
          className="object-cover w-full h-full self-center"
          src={image}
          alt={name}
        />
      </button>
      <div
        className="z-50 hidden my-4 w-48 text-base list-none  divide-y divide-gray-100 rounded-lg shadow bg-[#f7f8fd]"
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block truncate text-md text-purple-500 font-bold dark:text-white">
            {name}
          </span>
          <span className="block truncate text-center text-sm font-medium text-gray-500">
            {email}
          </span>
        </div>
        <ul className="p-2 " aria-labelledby="user-menu-button">
          <li>
            <Link
              className="block px-4 py-2 text-sm text-slate-600 hover:text-white rounded-lg duration-150  hover:bg-primary"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 text-sm text-slate-600 hover:text-white rounded-lg duration-150  hover:bg-primary"
              to="/profile"
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              className="block w-full px-4 py-2 text-sm text-slate-600 hover:text-white rounded-lg duration-150  hover:bg-primary"
              onClick={() => {
                mutation.mutate();
              }}
            >
              {mutation.isLoading ? "wait..." : "Logout"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
