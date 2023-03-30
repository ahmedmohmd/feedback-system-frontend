import { Link } from "react-router-dom";

interface Props {
  name: string;
  email: string;
  image: string;
}

const UserMenu = ({ name, email, image }: Props) => {
  return (
    <div className="flex items-center justify-center md:order-2 mt-8 md:mt-0">
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="flex object-cover w-12 md:w-full h-12 rounded-full self-center"
          src={image}
          alt={name}
        />
      </button>
      <div
        className="z-50 hidden my-4 text-base list-none  divide-y divide-gray-100 rounded-lg shadow bg-[#f7f8fd]"
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-md text-purple-500 font-bold dark:text-white">
            {name}
          </span>
          <span className="block text-center text-sm font-medium text-gray-500 truncate">
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
            <Link
              className="block px-4 py-2 text-sm text-slate-600 hover:text-white rounded-lg duration-150  hover:bg-primary"
              to="/logout"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;

// how create function to add two numbers?
