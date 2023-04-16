import { Modal } from "flowbite-react";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";

import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useId, useState } from "react";
import { useMutation, useQueries, useQuery } from "react-query";
import * as yup from "yup";
import feedbackService from "../../services/feedbackService";
import Label from "../atoms/Label";
import InputField from "../core/InputField";
import SelectField from "../core/SelectField";
import TextareaField from "../core/TextareaField";

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

const CustomModal = () => {
  const [show, setShow] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: feedbackService.createFeedback,
    onError: (error) => console.error(error),
    onSuccess: ({ data }) => {
      console.log(data);
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
    <>
      <Link
        onClick={() => setShow(true)}
        to="/"
        className="group duration-300 flex justify-center items-center gap-2 p-1 py-4 md:py-3 md:px-4 md:!h-full h-14 w-14 md:w-auto rounded-full bg-primary md:hover:bg-purple-600 md:rounded-2xl font-bold"
      >
        <GoPlus className="md:group-hover:rotate-0 group-hover:rotate-180 duration-300 md:group-hover:scale-[1] group-hover:scale-[1.3] font-bold text-2xl md:text-xl " />
        <span className="flex-1 hidden text-sm md:block">Add Feedback</span>
      </Link>

      <Modal
        show={show}
        onClose={() => {
          setShow(false);
        }}
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
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
        <article className="bg-white flex justify-center items-center rounded-2xl text-slate-600 p-10 w-full md:w-[500px] lg:w-[600px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full gap-5 font-medium text-slate-500"
          >
            <InputField
              id="title"
              name="title"
              label="Title"
              value={values.title}
              errors={errors}
              touched={touched}
              type="text"
              placeholder="exmaple: add dark theme"
              onChange={handleChange}
              onBlur={handleBlur}
              containerClassName="w-full"
              inputClassName="focus:!text-primary duration-300 focus:!border-primary border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-full px-5 h-14 outline-none !ring-0 w-full"
            />

            <TextareaField
              errors={errors}
              label="Description"
              placeholder="exmaple: more details"
              id="description"
              touched={touched}
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              containerClassName="w-full"
              textareaClassName="focus:!text-primary duration-300 focus:!border-primary resize-none p-5 border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-3xl outline-none !ring-0 w-full"
            />

            <SelectField
              label="Roadmap"
              onChange={handleChange}
              name="roadmap"
              id="roadmap"
              value={values.roadmap}
              className="focus:!border-primary focus:!text-primary duration-300 hover:cursor-pointer rounded-3xl border-2 outline-none !ring-0 !border-gray-200 "
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
                      key={Math.random()}
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
              className={`py-3 font-semibold text-white duration-300 rounded-3xl ${
                isLoading ? "bg-primary/70" : "bg-primary/90 hover:bg-primary"
              } px-9`}
            >
              Create
            </button>
          </form>
        </article>
      </Modal>
    </>
  );
};

export default CustomModal;
