import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation } from "react-query";
import swal from "sweetalert";
import * as yup from "yup";
import InputField from "../components/core/InputField";
import authService from "../services/authService";

const Heading = styled.h1`
  position: relative;
  white-space: nowrap;
  &:after {
    --deco-height: 0.3125em;
    content: "";
    position: absolute;
    z-index: 10;
    left: 0;
    width: 75%;
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(var(--deco-height) * -1.3);
    height: var(--deco-height);
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='M-17 30.5C-1 22 72-4 54 13 37.9 28.2-2.5 57.5 16 55.5s72-29 104-40' stroke='orange' stroke-width='10'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h100v64H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
    background-size: auto 100%;
    background-repeat: round;
    background-position: 0em;
  }
`;

const resetRequestSchema = yup.object({
  email: yup.string().email().required(),
});

const initialValues = {
  email: "",
};

const ResetRequest = () => {
  const handleResetRequest = (values) => {
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
    validationSchema: resetRequestSchema,
    onSubmit: handleResetRequest,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: authService.resetRequest,
    onError: (error: any) => {
      if (error.message) {
        setErrors({
          email: error.message,
        });
      } else {
        const emailRegEx = /\bemail\b/i;
        setErrors({
          email: error.errors.find((error) => emailRegEx.test(error.msg))?.msg,
        });
      }
    },

    onSuccess: async () => {
      await swal(
        "Reset Request Succeeded!",
        "Please Check You Email Inbox!",
        "success"
      );

      location.href = "/";
    },
  });

  return (
    <div className="w-full flex justify-center items-center min-h-[calc(100vh-80px)] px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 justify-center items-center flex-col"
      >
        <Heading className="text-center text-3xl sm:text-4xl md:text-5xl mb-28 md:mb-26 font-modak text-[#6c63ff] tracking-widest">
          Password Reset
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
          containerClassName="flex justify-center items-start flex-col w-full lg:w-[30%] md:w-[50%]"
          inputClassName="font-medium bg-slate-50 text-slate-500 focus:!text-primary duration-300 focus:!border-primary border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-full px-5 h-14 outline-none  !ring-0 w-full"
        />

        <button
          type="submit"
          className={`py-3 mt-6 font-semibold text-white duration-300 rounded-3xl ${
            isLoading ? "bg-primary/70" : "bg-primary/90 hover:bg-primary"
          } px-9`}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ResetRequest;
