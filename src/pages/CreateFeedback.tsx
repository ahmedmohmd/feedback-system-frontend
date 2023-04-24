import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { useId, useState } from "react";
import { GoPlus } from "react-icons/go";
import { TiArrowLeftThick } from "react-icons/ti";
import { RefetchOptions, useMutation } from "react-query";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Label from "../components/atoms/Label";
import InputField from "../components/core/InputField";
import SelectField from "../components/core/SelectField";
import TextareaField from "../components/core/TextareaField";
import feedbackService from "../services/feedbackService";
import queryClient from "../utils/queryClient";

const feedbackSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  roadmap: yup.string().required("Please choose one of them."),
  categories: yup.array(yup.string()).required(),
});

// Consts
const initialValues = {
  title: "",
  description: "",
  roadmap: "live",
  categories: ["All"],
};

const roadmapOptions = [
  {
    name: "Live",
    value: "live",
    selected: true,
  },
  {
    name: "In-Progress",
    value: "in-progress",
  },
  {
    name: "Planned",
    value: "planned",
  },
];

const tags = ["UI", "UX", "Enhancement", "Bug", "Feature"];

const CreateFeedback = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: feedbackService.createFeedback,
    onError: (error) => console.error(error),
    onSuccess: ({ data }) => {
      queryClient.refetchQueries();
    },
  });

  const handleCreate = (values) => {
    mutate(values);
  };
  const {
    setFieldValue,
    handleSubmit,
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: feedbackSchema,
    onSubmit: handleCreate,
  });

  const handleTagClick = (category) => {
    let ceto: any = document.getElementById(category);

    if (values.categories.includes(category)) {
      ceto.style.backgroundColor = "rgb(63 131 248 / 0.9)";

      return setFieldValue("categories", [
        ...[...values.categories, category].filter((value) => {
          return value !== category;
        }),
      ]);
    } else {
      ceto.style.backgroundColor = "#34d399";
      return setFieldValue("categories", [
        ...[...values.categories, category].filter((value, index, self) => {
          return self.indexOf(value) === index;
        }),
      ]);
    }
  };

  return (
    <div className="container mx-auto px-4 ">
      <section className="mt-10 w-full flex justify-between items-center">
        <Link
          to="/"
          className="flex justify-center items-center gap-2 hover:bg-gray-200 duration-150  py-2 rounded-2xl px-3"
        >
          <TiArrowLeftThick className="text-xl text-blue-700" />
          <span className="text-lg font-medium text-slate-500">Back</span>
        </Link>
      </section>

      <article className="flex justify-center items-center rounded-2xl text-slate-600 p-4 mt-4 w-full h-full md:w-1/2 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mb-16 items-center justify-center w-full gap-5 font-medium text-slate-500"
        >
          <InputField
            id="title"
            name="title"
            label="Title"
            value={values.title}
            errors={errors}
            touched={touched}
            type="text"
            placeholder="Enter Your Feedback's Title..."
            onChange={handleChange}
            onBlur={handleBlur}
            containerClassName="w-full"
            inputClassName="focus:!text-primary truncate bg-[#f8fafc] duration-300 focus:!border-primary border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-full px-5 h-14 outline-none !ring-0 w-full"
          />

          <TextareaField
            errors={errors}
            label="Description"
            placeholder="Enter Your Feedback's Description..."
            id="description"
            touched={touched}
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            containerClassName="w-full"
            textareaClassName="focus:!text-primary bg-[#f8fafc] !h-[12rem] duration-300 focus:!border-primary resize-none p-5 border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-3xl outline-none !ring-0 w-full"
          />

          <SelectField
            label="Roadmap"
            onChange={handleChange}
            name="roadmap"
            id="roadmap"
            value={values.roadmap}
            className="focus:!border-primary bg-[#f8fafc] focus:!text-primary duration-300 hover:cursor-pointer rounded-3xl border-2 outline-none !ring-0 !border-gray-200 "
            options={roadmapOptions}
          />

          <section className="flex flex-col items-start self-start justify-center">
            <Label name="Tags" to="tags" />
            <section
              id="tags"
              className="flex flex-wrap items-center self-start justify-start gap-4"
            >
              {tags.map((category) => {
                return (
                  <span
                    key={category}
                    onClick={() => handleTagClick(category)}
                    className="px-4 py-2 text-lg text-white duration-150 hover:cursor-pointer rounded-xl hover:bg-blue-500 bg-blue-500/90"
                    id={category}
                  >
                    {category}
                  </span>
                );
              })}
            </section>
          </section>

          <button
            type="submit"
            className={`py-3 mt-5 font-semibold flex justify-between items-center text-white duration-300 rounded-3xl ${
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
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </article>
    </div>
  );
};

export default CreateFeedback;
