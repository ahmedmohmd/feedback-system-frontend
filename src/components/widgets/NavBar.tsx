import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import GlobalContext from "../../utils/globalContext";
import UserMenu from "./UserMenu";

const Logo = styled.h1(
  `text-shadow: -1px 0 black, 
                0 1px black, 
                1px 0 black, 
                0 -1px black;`
);

const LINKS = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
];

const NavBar = () => {
  const { user } = useContext(GlobalContext)!;

  return (
    <nav className="sticky z-40 top-0 left-0 shadow p-3 py-4 border-gray-200 bg-[#f7f8fd]/80 backdrop-blur-2xl">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to="/" className="flex justify-center items-center">
          <img
            src="/images/logo.png"
            className="h-6 mr-3 sm:h-10"
            alt="Website Logo"
          />
          <Logo className="self-center text-3xl font-semibold whitespace-nowrap text-yellow-300">
            FB
          </Logo>
        </Link>
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-400/80 rounded-lg duration-200 md:hidden hover:bg-slate-400/10 outline-none "
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden  w-full  md:flex justify-end items-center gap-4 md:w-auto"
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col w-full !gap-5 text-center font-medium mt-4 rounded-lg  md:gap-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li className="!ml-0">
              <NavLink
                className={
                  "block p-3 bg-transparent text-slate-500 rounded-xl hover:bg-slate-200/60 duration-200"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {user ? (
              <UserMenu
                name={user.name}
                image={user.image}
                email={user.email}
              />
            ) : (
              <>
                <li className="!ml-0">
                  <NavLink
                    className={
                      "block  p-3 bg-transparent text-slate-500 rounded-xl hover:bg-slate-200/60 duration-200"
                    }
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="!ml-0">
                  <NavLink
                    className={
                      "block  p-3 bg-transparent text-slate-500 rounded-xl hover:bg-slate-200/60 duration-200"
                    }
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
