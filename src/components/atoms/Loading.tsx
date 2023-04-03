import Lottie from "lottie-react";
import loadingAnimationData from "../../assets/loading.json";

const Loading = () => {
  return (
    <Lottie
      className="w-1/2 md:w-1/5 h-1/2 md:h-1/5 md:mt-18 lg:mt-32"
      animationData={loadingAnimationData}
      loop={true}
    />
  );
};

export default Loading;
