import { Modal } from "flowbite-react";
import { useFormik } from "formik";
import { useId, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RefetchOptions, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import feedbackService from "../../services/feedbackService";
import queryClient from "../../utils/queryClient";
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

const CreateFeedback = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: feedbackService.createFeedback,
    onError: (error) => console.error(error),
    onSuccess: ({ data }) => {
      queryClient.refetchQueries();
      console.log(data);

      // navigate("/");
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
          className={`py-3 font-semibold text-white duration-300 rounded-3xl ${
            isLoading ? "bg-primary/70" : "bg-primary/90 hover:bg-primary"
          } px-9`}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </article>
  );
};

export default CreateFeedback;
