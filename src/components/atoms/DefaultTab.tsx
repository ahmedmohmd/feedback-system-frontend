import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsFillImageFill } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { useMutation } from "react-query";
import * as yup from "yup";
import trueAnimationData from "../../assets/true.json";
import config from "../../config/config";
import authService from "../../services/authService";
import GlobalContext from "../../utils/globalContext";
import InputField from "../core/InputField";

const updateNameSchema = yup.object({
  name: yup.string().required(),
});

const Default = () => {
  const [image, setImage] = useState<any>();
  const [imagePreview, setImagePreview] = useState<string>();
  const [show, setShow] = useState(false);
  const [imageUpdated, setImageUpdated] = useState<boolean>(false);
  const [nameUpdated, setNameUpdated] = useState<boolean>(false);
  const { user }: any = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm({
    resolver: yupResolver(updateNameSchema),
    mode: "onTouched",
  });

  let initialValues = {
    name: user?.name,
  };

  const updateImage = useMutation({
    mutationFn: (data: any) =>
      axios.patch(`${config.baseUrl}/user`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),
    onSuccess: ({ data }) => {
      setImageUpdated(true);

      authService.setToken(data.token);
      setShow(false);
      setTimeout(() => {
        setImageUpdated(false);
        location.href = "/profile/default";
      }, 3000);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateName = useMutation({
    mutationFn: (data: any) =>
      axios.patch(`${config.baseUrl}/user`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }),

    onSuccess: ({ data }) => {
      setNameUpdated(true);

      authService.setToken(data.token);

      setTimeout(() => {
        setNameUpdated(false);
        location.href = "/profile/default";
      }, 3000);
    },

    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateName = (values) => {
    updateName.mutate({
      name: values.name,
    });
  };

  // const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
  //   useFormik({
  //     initialValues,
  //     validationSchema: updateNameSchema,
  //     onSubmit: handleUpdateName,
  //   });

  return (
    <div className="flex-1 p-4">
      <button
        type="button"
        onClick={() => {
          setShow(!show);
        }}
        className="group relative left-1/2 -translate-x-1/2 -z-0 rounded-full  border-[5px] border-slate-300/75"
      >
        <img
          src={user?.image}
          className="w-36 h-36 object-cover hover:cursor-pointer rounded-full"
          alt={user?.name}
        />

        <div className="w-full rounded-full group-hover:flex hover:cursor-pointer h-full absolute hidden  justify-center items-center  bg-slate-700/50 top-0 left-0">
          <CiImageOn className="text-5xl text-white" />
        </div>
        {imageUpdated ? (
          <Lottie
            className="w-24 absolute -right-[20%] -bottom-[20%] z-50 text-3xl"
            animationData={trueAnimationData}
            loop={true}
          />
        ) : null}
      </button>

      <Modal
        show={show}
        onClose={() => {
          setShow(false);
        }}
      >
        <button
          type="button"
          className="absolute duration-150 top-3 z-[60] right-3 text-red-500 bg-transparent hover:bg-red-500/90 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            setShow(false);
          }}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="p-6 flex justify-center flex-col gap-3 items-center space-y-6 relative z-50 ">
          {!imagePreview ? (
            <>
              <label
                htmlFor="user-image"
                className="p-4 border-dashed border-2 border-slate-200 rounded-3xl hover:cursor-pointer"
              >
                <BsFillImageFill className="text-9xl text-slate-200" />
              </label>
              <input
                onChange={(event: any) => {
                  setImage(event.target.files[0]);
                  setImagePreview(URL.createObjectURL(event.target.files[0]));
                }}
                hidden
                type="file"
                id="user-image"
              />
            </>
          ) : null}

          {imagePreview ? (
            <div className="relative">
              <button
                type="button"
                className="absolute top-3 right-3 bg-white/90 text-red-500 duration-150 hover:bg-red-500/90 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="change-image-modal"
                onClick={() => {
                  setImagePreview("");
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <img
                src={imagePreview}
                alt="User Image"
                className="md:w-[300px] w-[250px] md:h-[300px] h-[250px] rounded-3xl object-cover"
              />
            </div>
          ) : null}

          <button
            type="submit"
            onClick={() => {
              const formData = new FormData();
              formData.append("image", image);

              updateImage.mutate(formData);
            }}
            className={`py-3 mt-4 font-semibold text-white duration-300 rounded-3xl ${
              updateImage.isLoading
                ? "bg-primary/70"
                : "bg-primary/90 hover:bg-primary"
            } px-9`}
          >
            {updateImage.isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </Modal>

      <form
        onSubmit={handleSubmit(handleUpdateName)}
        className="md:w-[75%] lg:w-[50%] xl:w-[30%] w-full top-8 relative flex justify-center items-center flex-col gap-3 left-1/2 -translate-x-1/2"
      >
        <section className="w-full relative">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                errors={errors}
                title={"Name"}
                field={"name"}
                type={"text"}
                to={"name"}
                w="w-full"
              />
            )}
          />

          {nameUpdated ? (
            <Lottie
              className="w-20 absolute md:-right-[17%] -right-[10px] -bottom-[12%] z-50 text-3xl"
              animationData={trueAnimationData}
              loop={true}
            />
          ) : null}
        </section>

        <button
          className={`py-3 mt-4 font-semibold text-white duration-300 rounded-3xl ${
            updateName.isLoading
              ? "bg-primary/70"
              : "bg-primary/90 hover:bg-primary"
          } px-9`}
          type="submit"
        >
          {updateName.isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Default;
