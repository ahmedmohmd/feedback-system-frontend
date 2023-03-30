import FeedbacksList from "../components/widgets/FeedbacksList";
import HeadingCard from "../components/widgets/HeadingCard";
import Roadmap from "../components/widgets/Roadmap";
import Tags from "../components/widgets/Tags";

const Home = () => {
  return (
    <div className="container mx-auto px-4 flex justify-between items-start mt-10 flex-wrap gap-7">
      <div className="md:justify-center items-stretch gap-4 md:gap-7 flex flex-row lg:flex-col overflow-x-scroll md:overflow-hidden">
        <HeadingCard />
        <Tags />
        <Roadmap />
      </div>
      <FeedbacksList />
    </div>
  );
};

export default Home;
