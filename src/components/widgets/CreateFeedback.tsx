import { useFormik } from "formik";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import * as yup from "yup";
import ErrorMessage from "../atoms/ErrorMessage";
import Label from "../atoms/Label";

const feedbackSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  roadmap: yup.string().required("Please choose one of them."),
  categories: yup.array(yup.string()).required(),
});

const initialValues = {
  title: "",
  description: "",
  roadmap: "live",
  categories: ["All"],
};

const CreateFeedback = () => {
  const handleCreate = (values) => {
    alert(JSON.stringify(values));
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
    <article className="h-full">
      <Link
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        to="/"
        className="group duration-300 flex justify-center items-center gap-2 p-1 py-4 md:py-3 md:px-4 md:!h-full h-14 w-14 md:w-auto rounded-full bg-primary md:hover:bg-purple-600 md:rounded-2xl font-bold"
      >
        <GoPlus className="md:group-hover:rotate-0 group-hover:rotate-180 duration-300 md:group-hover:scale-[1] group-hover:scale-[1.3] font-bold text-2xl md:text-xl " />
        <span className="text-sm flex-1 hidden md:block">Add Feedback</span>
      </Link>

      <article
        id="defaultModal"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full"
      >
        <article className="bg-white flex justify-center items-center rounded-2xl text-slate-600 p-10 w-full md:w-[500px] lg:w-[600px]">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center gap-5 flex-col w-full text-slate-500 font-medium"
          >
            <section className="flex justify-center items-start flex-col w-full">
              <Label name="Title" to="title" />
              <input
                id="title"
                placeholder="exmaple: add dark theme"
                name="title"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className="border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-full px-5 h-14 outline-none !ring-0 w-full"
              />
              <ErrorMessage errors={errors.title} touched={touched.title} />
            </section>

            <section className="flex justify-center items-start flex-col w-full">
              <Label name="Description" to="description" />
              <textarea
                placeholder="exmaple: more details"
                id="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className="resize-none p-5 border-2 placeholder:text-gray-400/50 !border-gray-200 rounded-3xl outline-none !ring-0 w-full"
              />
              <ErrorMessage
                errors={errors.description}
                touched={touched.description}
              />
            </section>

            <section className="flex justify-center items-start  flex-col w-full">
              <Label name="Roadmap" to="roadmap" />
              <select
                onChange={handleChange}
                value={values.roadmap}
                id="roadmap"
                name="roadmap"
                className="hover:cursor-pointer rounded-3xl border-2 outline-none !ring-0 !border-gray-200 "
              >
                <option selected value="live">
                  Live
                </option>
                <option value="in-progress">In-Progress</option>
                <option value="planned">Plannned</option>
              </select>
            </section>

            <section className="flex  self-start items-start justify-center  flex-col">
              <Label name="Tags" to="tags" />
              <section
                id="tags"
                className="flex self-start justify-start gap-4 items-center"
              >
                {["UI", "UX"].map((category) => {
                  return (
                    <span
                      onClick={() => handleTagClick(category)}
                      className="hover:cursor-pointer py-2 px-4 rounded-xl hover:bg-blue-500 duration-300 bg-blue-500/90 text-lg text-white"
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
              className="rounded-3xl bg-primary/90 hover:bg-primary duration-300 py-3 px-9 text-white font-semibold "
            >
              Create
            </button>
          </form>
        </article>
      </article>
    </article>
  );
};

export default CreateFeedback;
