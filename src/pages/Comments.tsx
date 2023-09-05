import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { TiArrowLeftThick } from "react-icons/ti";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import commentingAnimationData from "../assets/commenting.json";
import AddComment from "../components/widgets/AddComment";
import Comment from "../components/widgets/Comment";
import FeedbackCard from "../components/widgets/FeedbackCard";
import homeService from "../services/globalService";
import GlobalContext from "../utils/globalContext";
import queryClient from "../utils/queryClient";

const Comments = () => {
  const { feedbackId } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const { user } = useContext(GlobalContext)!;

  const handleCommenting = (state: boolean) => {
    setIsCommenting(state);
  };

  const feedbackQuery = useQuery({
    queryFn: homeService.getSingleFeedback,
    queryKey: ["feedback", feedbackId],
    onError: (error) => console.log("Feedback: ", error),
    onSuccess: async ({ data }) => {
      setFeedback(data);
      const { data: comments } = await homeService.getComments({
        queryKey: [data._id],
      });
      setComments(comments);
    },
  });

  return (
    <div className="container mx-auto px-4 bg-[#f7f8fd] pb-16">
      <section className="mt-10 w-full flex justify-between items-center">
        <Link
          to="/"
          className="flex justify-center items-center gap-2 hover:bg-slate-200/50 duration-150  py-2 rounded-2xl px-3"
        >
          <TiArrowLeftThick className="text-xl text-blue-700" />
          <span className="text-lg font-medium text-slate-500">Back</span>
        </Link>

        {user && (
          <Link
            to="/create-feedback"
            className="bg-[#4654e6] hover:bg-[#3a46c8] text-white font-medium duration-300 py-3 rounded-2xl px-4"
          >
            Create Feedback
          </Link>
        )}
      </section>

      <section className="mt-5 mb-8">
        {feedbackQuery.isSuccess ? (
          <FeedbackCard isRoadmap={false} feedback={feedbackQuery.data.data} />
        ) : null}
      </section>
      {feedbackQuery.isSuccess ? (
        <section className="w-full">
          {feedbackQuery.data.data.comments.length > 0 ? (
            <h3 className="text-xl font-bold text-slate-700 mb-4">
              {feedbackQuery.data.data.comments.length} Comments
            </h3>
          ) : (
            <h3 className="text-xl text-center my-20 font-bold text-slate-700 mb-4 ml-1">
              Sorry, There are No Comments Found{" "}
              <span className="text-2xl">😥</span>
            </h3>
          )}

          {comments.map((comment: any) => (
            <Comment
              feedbackId={feedbackId}
              key={comment._id}
              comment={comment}
            />
          ))}
        </section>
      ) : null}
      {user && isCommenting && (
        <section className="flex justify-start items-center ">
          <span className="translate-x-3 text-slate-400 text-lg font-medium">
            Commenting
          </span>
          <Lottie
            className="w-16 translate-y-1"
            animationData={commentingAnimationData}
            loop={true}
          />
        </section>
      )}
      {user && (
        <AddComment
          onComment={handleCommenting}
          feedbackId={feedbackQuery?.data?.data._id}
        />
      )}
    </div>
  );
};

export default Comments;
