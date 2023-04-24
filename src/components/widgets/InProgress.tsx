import { useContext } from "react";
import GlobalContext from "../../utils/globalContext";
import FeedbackCard from "./FeedbackCard";

const InProgress = () => {
  const {
    feedbacks: { data },
  } = useContext(GlobalContext);

  return data
    .filter((feedback) => feedback.roadmap === "in-progress")
    .map((feedback) => {
      return (
        <FeedbackCard
          isRoadmap={true}
          feedback={feedback}
          key={Math.random()}
        />
      );
    });
};

export default InProgress;
