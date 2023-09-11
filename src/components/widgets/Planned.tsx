import { useContext } from "react";
import GlobalContext from "../../utils/globalContext";
import FeedbackCard from "./FeedbackCard";

const Planned = () => {
  const {
    feedbacks: { data },
  }: any = useContext(GlobalContext);

  return data
    .filter((feedback) => feedback.roadmap === "planned")
    .map((feedback) => {
      console.log(feedback);

      return (
        <FeedbackCard
          isRoadmap={true}
          feedback={feedback}
          key={Math.random()}
        />
      );
    });
};

export default Planned;
