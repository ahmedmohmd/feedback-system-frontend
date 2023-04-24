import { FaComment } from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import globalService from "../../services/globalService";
import queryClient from "../../utils/queryClient";

const FeedbackCard = ({ feedback, isRoadmap }) => {
  const { mutate } = useMutation({
    mutationFn: globalService.voteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries("feedbacks");
      queryClient.invalidateQueries("feedback");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isRoadmap) {
    return (
      <article
        className={`p-8 w-full bg-white rounded-3xl flex justify-between items-center flex-col gap-6 ${`relative before:absolute before:top-0 before:left-0 before:w-full before:h-3 ${
          feedback.roadmap === "planned"
            ? "before:bg-[#f49e85]"
            : feedback.roadmap === "in-progress"
            ? "before:bg-[#ae1feb]"
            : "before:bg-[#61bcfa]"
        } before:rounded-t-3xl`}`}
      >
        <section className="w-full flex justify-start items-center">
          <section className="flex justify-center items-center g-10 ">
            <span
              className={`w-2 h-2  rounded-full ${
                feedback.roadmap === "planned"
                  ? "bg-[#f49e85]"
                  : feedback.roadmap === "in-progress"
                  ? "bg-[#ae1feb]"
                  : "bg-[#61bcfa]"
              } 0 mr-3`}
            />
            <span className="text-[#8993b0] font-semibold text-lg">
              {feedback.roadmap.substr(0, 1).toUpperCase() +
                feedback.roadmap.slice(1)}
            </span>
          </section>
        </section>
        <section className="flex-1 w-full">
          <section className="break-all">
            <h3 className="text-slate-600 font-bold mb-2 text-2xl">
              {feedback.title}
            </h3>
            <p className="text-slate-400 text-lg">{feedback.description}</p>
          </section>
          <section className="rounded-2xl flex  justify-start items-start gap-4 flex-wrap mt-4">
            {feedback.categories.map((tag) => {
              return (
                <span
                  key={Math.random()}
                  className="py-2 px-4 rounded-xl bg-[#eaedfd] font-bold text-[#4661e6]"
                >
                  {tag}
                </span>
              );
            })}
          </section>
        </section>

        <section className="w-full flex justify-between items-center">
          <section>
            <button
              onClick={() => {
                mutate(feedback._id);
              }}
              className="self-start bg-slate-200/50 stroke-4 flex justify-center items-center p-2 h-12 rounded-xl hover:bg-slate-200/90 duration-300 hover:cursor-pointer"
            >
              <MdKeyboardArrowUp className="text-blue-700 text-3xl" />
              <span className="font-bold text-md text-slate-600 p-2">
                {feedback.votes.length}
              </span>
            </button>
          </section>

          <Link
            to={`/feedbacks/${feedback._id}`}
            className="flex justify-center items-center gap-2"
          >
            <FaComment className="text-slate-200 text-2xl hover:text-slate-300" />
            <span className="font-bold text-lg text-slate-600 ">
              {feedback.comments.length}
            </span>
          </Link>
        </section>
      </article>
    );
  }

  return (
    <article
      className={`p-8 w-full bg-white rounded-3xl flex justify-between items-center flex-col md:flex-row gap-6`}
    >
      <button
        onClick={() => {
          mutate(feedback._id);
        }}
        className="self-start hidden bg-slate-200/50 flex-col stroke-4 md:flex justify-center items-center p-2 w-12 rounded-xl hover:bg-slate-200/90 duration-300 hover:cursor-pointer"
      >
        <MdKeyboardArrowUp className="text-blue-700 text-3xl" />
        <span className="font-bold text-md text-slate-600">
          {feedback.votes.length}
        </span>
      </button>

      <section className="flex-1">
        <section className="break-all">
          <h3 className="text-slate-600 font-bold mb-2 text-2xl">
            {feedback.title}
          </h3>
          <p className="text-slate-400 text-lg">{feedback.description}</p>
        </section>
        <section className="rounded-2xl flex  justify-start items-start gap-4 flex-wrap mt-4">
          {feedback.categories.map((tag) => {
            return (
              <span
                key={Math.random()}
                className="py-2 px-4 rounded-xl bg-[#eaedfd] font-bold text-[#4661e6]"
              >
                {tag}
              </span>
            );
          })}
        </section>
      </section>

      <Link
        to={`/feedbacks/${feedback._id}`}
        className="md:flex hidden justify-center items-center gap-2"
      >
        <FaComment className="text-slate-200 text-2xl hover:text-slate-300 duration-300 hover:cursor-pointer" />
        <span className="font-bold text-lg text-slate-600 ">
          {feedback?.comments?.length}
        </span>
      </Link>

      <section className="w-full flex justify-between items-center md:hidden ">
        <section>
          <button
            onClick={() => {
              mutate(feedback._id);
            }}
            className="self-start bg-slate-200/50 stroke-4 flex justify-center items-center p-2 h-12 rounded-xl hover:bg-slate-200/90 duration-300 hover:cursor-pointer"
          >
            <MdKeyboardArrowUp className="text-blue-700 text-3xl" />
            <span className="font-bold text-md text-slate-600 p-2">
              {feedback?.votes?.length}
            </span>
          </button>
        </section>

        <Link
          to={`/feedbacks/${feedback._id}`}
          className="flex justify-center items-center gap-2"
        >
          <FaComment className="text-slate-200 text-2xl hover:text-slate-300" />
          <span className="font-bold text-lg text-slate-600 ">
            {feedback?.comments?.length}
          </span>
        </Link>
      </section>
    </article>
  );
};

export default FeedbackCard;
