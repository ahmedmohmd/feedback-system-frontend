import Lottie from "lottie-react";
import errorAnimationData from "../assets/404.json";

const NotFound = () => {
  return (
    <article className="flex justify-center items-center flex-col w-full h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] ">
      <section className="md:w-1/4 w-2/3">
        <Lottie animationData={errorAnimationData} loop={true} />
        <h3 className="text-primary  text-center text-sm font-ubuntu md:text-xl mt-3 md:mt-5 tracking-widest ">
          Sorry, Page not Found!
        </h3>
      </section>
    </article>
  );
};

export default NotFound;
