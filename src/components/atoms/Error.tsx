import styled from "@emotion/styled";
import Lottie from "lottie-react";
import errorAnimationData from "../../assets/error.json";

const Error = () => {
  return (
    <section className="flex flex-col items-center justify-center md:mt-18 lg:mt-32">
      <Lottie
        animationData={errorAnimationData}
        className="w-1/2 h-1/2"
        loop={true}
      />
    </section>
  );
};

export default Error;
