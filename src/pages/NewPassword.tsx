import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import * as yup from "yup";
import ErrorMessage from "../components/atoms/ErrorMessage";
import Label from "../components/atoms/Label";
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

const initialValues = {
  password: "",
};

const newPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Sorry, You Password Must Be between 8 to 15 Character!")
    .max(15, "Sorry, You Password Must Be between 8 to 15 Character!")
    .required(),
});

const NewPassword = () => {
  const { resetToken } = useParams();
  const [show, setShow] = useState(false);

  const handleNewPassword = () => {
    mutate({
      newPassword: values.password,
      resetToken,
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
    validationSchema: newPasswordSchema,
    onSubmit: handleNewPassword,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: authService.newPassword,
    onError: (error: any) => {
      if (error.message) {
        setErrors({
          password: error.message,
        });
      } else {
        const passRegEx = /\bpassword\b/i;
        setErrors({
          password: error.errors.find((error) => passRegEx.test(error.msg))
            ?.msg,
        });
      }
    },
    onSuccess: async () => {
      await swal("Your Password Updated Successfully!", "success");
      location.href = "/login";
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Heading className="text-center text-3xl sm:text-4xl md:text-5xl mb-28 md:mb-26 font-modak text-[#6c63ff] tracking-widest">
          Password Reset
        </Heading>
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
            <ErrorMessage errors={errors.password} touched={touched.password} />
          </section>
        </section>

        <button type="submit">{isLoading ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
};

export default NewPassword;
