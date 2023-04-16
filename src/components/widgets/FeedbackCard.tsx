import { FaComment } from "react-icons/fa";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useMutation } from "react-query";
import homeService from "../../services/homeService";

const FeedbackCard = ({ feedback }) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: homeService.voteFeedback,
    onSuccess: () => {
      location.href = "/";
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <article className="p-8 w-full bg-white rounded-3xl flex justify-between items-center flex-col md:flex-row gap-6">
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
        <section>
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

      <section className="md:flex hidden justify-center items-center gap-2">
        <FaComment className="text-slate-200 text-2xl hover:text-slate-300 duration-300 hover:cursor-pointer" />
        <span className="font-bold text-lg text-slate-600 ">
          {feedback.comments.length}
        </span>
      </section>

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
              {feedback.votes.length}
            </span>
          </button>
        </section>

        <section className="flex justify-center items-center gap-2">
          <FaComment className="text-slate-200 text-2xl hover:text-slate-300" />
          <span className="font-bold text-lg text-slate-600 ">
            {feedback.comments.length}
          </span>
        </section>
      </section>
    </article>
  );
};

export default FeedbackCard;
