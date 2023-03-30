import Lottie from "lottie-react";
import { useQuery } from "react-query";
import errorAnimationData from "../../assets/404.json";
import loadingAnimationData from "../../assets/loading.json";
import { getAllFeedbacks } from "../../services/feedbacks";
import Control from "./Control";
import FeedbackCard from "./FeedbackCard";

const FeedbacksList = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: "feedbacks",
    queryFn: getAllFeedbacks,
  });

  return (
    <div className="flex-1 gap-8 flex-col">
      <Control />
      <div className="w-full mt-8 flex h-full justify-center items-center gap-6 flex-col mb-10">
        {isLoading ? (
          <Lottie animationData={loadingAnimationData} loop={true} />
        ) : isError ? (
          <Lottie
            animationData={errorAnimationData}
            className="w-1/2  h-1/2"
            loop={true}
          />
        ) : (
          data.map((feedback) => {
            return <FeedbackCard feedback={feedback} />;
          })
        )}
      </div>
    </div>
  );
};

export default FeedbacksList;
