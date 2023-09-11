import { useContext, useId, useState } from "react";
import { useQuery } from "react-query";
import { getAllFeedbacks } from "../../services/feedbacks";
import GlobalContext from "../../utils/globalContext";
import Error from "../atoms/Error";
import Loading from "../atoms/Loading";
import NoResult from "../atoms/NoResult";
import Control from "./Control";
import FeedbackCard from "./FeedbackCard";

const FeedbacksList = () => {
  const {
    feedbacks: { data, isError, isLoading },
  }: any = useContext(GlobalContext);

  return (
    <div className="flex-col flex-1 gap-8">
      <Control />
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full gap-6 mt-8 mb-10">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error />
        ) : data.length > 0 ? (
          data.map((feedback) => {
            return (
              <FeedbackCard
                isRoadmap={false}
                key={Math.random()}
                feedback={feedback}
              />
            );
          })
        ) : (
          <NoResult />
        )}
      </div>
    </div>
  );
};

export default FeedbacksList;
