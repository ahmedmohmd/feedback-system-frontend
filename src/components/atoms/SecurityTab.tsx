import { yupResolver } from "@hookform/resolvers/yup";
import { useFormik } from "formik";
import Lottie from "lottie-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiFillEyeInvisible } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useMutation } from "react-query";
import * as yup from "yup";
import trueAnimationData from "../../assets/true.json";
import authService from "../../services/authService";
import userService from "../../services/userService";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

const updatePasswordSchema = yup.object({
  password: yup.string().required(),
});

const Security = () => {
  const [show, setShow] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState<boolean>(false);

  let initialValues = {
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
    mode: "onTouched",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: userService.updateUser,

    onSuccess: ({ data }) => {
      setPasswordUpdated(true);
      authService.setToken(data.token);

      setTimeout(() => {
        setPasswordUpdated(false);
        location.href = "/profile/security";
      }, 3000);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const handleupdatePassword = (values) => {
    mutate({
      password: values.password,
    });
  };

  return (
    <div className="flex-1 p-4">
      <form
        onSubmit={handleSubmit(handleupdatePassword)}
        className="md:w-[75%] lg:w-[50%] xl:w-[30%] w-full top-8 relative flex justify-center items-center flex-col gap-3 left-1/2 -translate-x-1/2"
      >
        {/* <Label name="Password" to="password" /> */}
        <section className="relative w-full">
          <section className="flex flex-col items-start justify-center flex-1 w-full">
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
        </section>
        <button
          className={`py-3 mt-4 font-semibold text-white duration-300 rounded-3xl ${
            isLoading ? "bg-primary/70" : "bg-primary/90 hover:bg-primary"
          } px-9`}
          type="submit"
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Security;
