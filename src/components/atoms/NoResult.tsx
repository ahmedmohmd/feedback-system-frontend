import Lottie from "lottie-react";
import notFoundAnimationData from "../../assets/no-result.json";

const NoResult = () => {
  return (
    <section className="flex flex-col items-center justify-center md:mt-18 lg:mt-32">
      <Lottie
        animationData={notFoundAnimationData}
        className="w-2/3 h-2/3"
        loop={true}
      />
      <span className="relative mt-3 text-sm font-medium tracking-widest text-center md:text-md font-ubuntu text-primary/75">
        Sorry, No Feedbacks Found
      </span>
    </section>
  );
};

export default NoResult;
