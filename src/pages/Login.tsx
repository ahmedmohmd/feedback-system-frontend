import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "react-query";
import * as yup from "yup";
import ErrorMessage from "../components/atoms/ErrorMessage";
import Label from "../components/atoms/Label";
import InputField from "../components/core/InputField";
import authService from "../services/authService";

import { Controller, useForm } from "react-hook-form";

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

  // const {
  //   handleSubmit,
  //   errors,
  //   values,
  //   handleBlur,
  //   handleChange,
  //   touched,
  //   setErrors,
  // } = useFormik({
  //   initialValues,
  //   validationSchema: signInSchema,
  //   onSubmit: handleSignIn,
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "onTouched",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: authService.login,
    onError: (error: any) => {
      if (error.message) {
        if (error.message.startsWith("Password")) {
          setError("password", {
            type: "custom",
            message: error.message,
          });
        } else {
          setError("email", {
            type: "custom",
            message: error.message,
          });
        }
      }
    },

    onSuccess: ({ data: { token } }) => {
      authService.setToken(token);
      const expiryTime = new Date().getTime() + 3600 * 1000; // 1 hour from now
      localStorage.setItem("expiryTime", expiryTime.toString());

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
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col items-center justify-center flex-1 gap-4 md:gap-6"
        >
          <Heading className="text-center text-6xl mb-14 font-modak text-[#6c63ff] tracking-widest">
            Sign In
          </Heading>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                errors={errors}
                title={"Email"}
                field={"email"}
                type={"email"}
                to={"email"}
              />
            )}
          />

          <section className="flex flex-col items-start justify-center flex-1 w-full md:w-[60%]">
            <Label title="Password" to="password" />
            <section className="relative w-full">
              <input
                id="password"
                placeholder="password should be between 8 to 15 char"
                type={show ? "text" : "password"}
                {...register("password")}
                className=" bg-slate-50 text-slate-500 focus:!text-primary duration-300 focus:!border-primary border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-full px-5 h-14 outline-none !ring-0 w-full"
              />

              <span
                className="absolute z-30 -translate-y-1/2 right-5 top-1/2 hover:cursor-pointer"
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
            <ErrorMessage errors={errors} field={"password"} />
          </section>

          <button
            type="submit"
            className={`py-3 mt-5  flex justify-between items-center text-white duration-300 rounded-3xl ${
              isLoading ? "bg-primary/70" : "bg-primary/90 hover:bg-primary"
            } px-9`}
          >
            {isLoading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 !stroke-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="4"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {isLoading ? "Wait" : "Login"}
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
