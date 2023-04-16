import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "react-query";
import * as yup from "yup";
import ErrorMessage from "../components/atoms/ErrorMessage";
import Label from "../components/atoms/Label";
import InputField from "../components/core/InputField";
import authService from "../services/authService";

import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";

const Heading = styled.h1`
  position: relative;
  white-space: nowrap;
  &:after {
    --deco-height: 0.3125em;
    content: "";
    position: absolute;
    left: 0;
    width: 75%;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%);
    bottom: calc(var(--deco-height) * -1.3);
    height: var(--deco-height);
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M-17 30.5C-1 22 72-4 54 13 37.9 28.2-2.5 57.5 16 55.5s72-29 104-40' stroke='orange' stroke-width='10'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h100v64H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-size: auto 100%;
    background-repeat: round;
    background-position: 0em;
  }
`;

const signInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "Sorry, You Password Must Be between 8 to 15 Character!")
    .max(15, "Sorry, You Password Must Be between 8 to 15 Character!")
    .required(),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [show, setShow] = useState(false);

  const handleSignIn = (values) => {
    mutate({
      email: values.email,
      password: values.password,
    });
  };

  const {
    handleSubmit,
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: handleSignIn,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: authService.login,
    onError: (error: any) => {
      if (error.message) {
        if (error.message.startsWith("Password")) {
          setErrors({
            password: error.message,
          });
        } else {
          setErrors({
            email: error.message,
          });
        }
      } else {
        const passRegEx = /\bpassword\b/;
        const emailRegEx = /\bemail\b/;

        setErrors({
          password: error.errors.find((error) => passRegEx.test(error.msg))
            ?.msg,
          email: error.errors.find((error) => emailRegEx.test(error.msg))?.msg,
        });
      }
    },

    onSuccess: ({ data: { token } }) => {
      authService.setToken(token);
      location.href = "/";
    },
  });

  return (
    <article className="container w-full px-4 mx-auto ">
      <div className="w-full flex justify-center items-center h-[calc(100vh-100px)] md:h-[calc(100vh-150px)]">
        <img
          className="hidden md:block w-[600px]"
          src="/images/login.png"
          alt="Login Icon"
        />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center flex-1 gap-4 md:gap-6"
        >
          <Heading className="text-center text-6xl mb-14 font-modak text-[#6c63ff] tracking-widest">
            Sign In
          </Heading>

          <InputField
            id="email"
            name="email"
            label="Email"
            value={values.email}
            errors={errors}
            touched={touched}
            type="email"
            placeholder="name@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            containerClassName="flex justify-center items-start flex-col w-full md:w-[60%]"
            inputClassName="font-medium bg-slate-50 text-slate-500 focus:!text-primary duration-300 focus:!border-primary border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-full px-5 h-14 outline-none !ring-0 w-full"
          />

          <section className="flex flex-col items-start justify-center flex-1 w-full md:w-[60%]">
            <Label name="Password" to="password" />
            <section className="relative w-full">
              <input
                id="password"
                placeholder="password should be between 8 to 15 char"
                name="password"
                type={show ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="font-medium bg-slate-50 text-slate-500 focus:!text-primary duration-300 focus:!border-primary border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-full px-5 h-14 outline-none !ring-0 w-full"
              />

              <span
                className="absolute z-20 -translate-y-1/2 right-5 top-1/2 hover:cursor-pointer"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? (
                  <AiFillEyeInvisible className="text-3xl duration-150 text-gray-400/80 hover:text-primary" />
                ) : (
                  <BiShow className="text-3xl duration-150 text-gray-400/80 hover:text-primary" />
                )}
              </span>
            </section>
            <ErrorMessage errors={errors.password} touched={touched.password} />
          </section>
          <button
            type="submit"
            className={`py-3 mt-6 font-semibold text-white duration-300 rounded-3xl ${
              isLoading ? "bg-primary/70" : "bg-primary/90 hover:bg-primary"
            } px-9`}
          >
            {isLoading ? "wait..." : "Login"}
          </button>
          <Link
            to="/reset"
            className="text-primary underline text-md -mt-2 md:-mt-3 underline-offset-[2px]"
          >
            Forgot Your Password!
          </Link>
        </form>
      </div>
    </article>
  );
};

export default Login;
