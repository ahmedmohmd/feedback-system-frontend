import styled from "@emotion/styled";
import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { FaMedapps } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { TiArrowLeftThick } from "react-icons/ti";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import CreateFeedback from "../components/widgets/CreateFeedback";
import FeedbackCard from "../components/widgets/FeedbackCard";
import GlobalContext from "../utils/globalContext";

const RodmapLinks = styled.div`
  .active {
    background: ${() => {
      if (location.href.split("/").includes("planned")) {
        return "#f49e85";
      } else if (location.href.split("/").includes("in-progress")) {
        return "#ae1feb";
      } else {
        return "#61bcfa";
      }
    }} !important;

    &:hover {
      background: ${() => {
        if (location.href.split("/").includes("planned")) {
          return "#f49e85";
        } else if (location.href.split("/").includes("in-progress")) {
          return "#ae1feb";
        } else {
          return "#61bcfa";
        }
      }} !important;
    }
  }
`;

const Roadmap = () => {
  // const [show, setShow] = useState(false);
  const {
    feedbacks: { data },
  }: any = useContext(GlobalContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/roadmap") {
      navigate("/roadmap/planned");
    }
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 pb-16">
      <article className="bg-[#373e68] text-white mt-6 rounded-2xl p-4 md:py-5 md:px-6 flex justify-between items-center">
        <section className="flex justify-between items-start gap-4 flex-col">
          <Link
            to="/"
            className="flex justify-center gap-3 items-center font-ubuntu text-lg font-nedium ml-2"
          >
            <TiArrowLeftThick />
            <span>Back to Home</span>
          </Link>

          <section className="md:flex justify-between items-center gap-6 hidden">
            <FaMedapps
              color="white"
              className="text-2xl md:text-4xl font-bold"
            />
            <span className="md:text-2xl font-bold">
              {data.length} Suggestions
            </span>
          </section>
        </section>

        <button
          onClick={() => navigate("/create-feedback")}
          className="group duration-300 flex justify-center items-center gap-2 p-1 py-4 md:py-4 md:px-4  h-14 w-14 md:w-auto rounded-full bg-primary md:hover:bg-purple-600 md:rounded-2xl font-bold"
        >
          <GoPlus className="md:group-hover:rotate-0 group-hover:rotate-180 duration-300 md:group-hover:scale-[1] group-hover:scale-[1.3] font-bold text-2xl md:text-xl " />
          <span className="flex-1 hidden text-sm md:block">Add Feedback</span>
        </button>
      </article>

      <RodmapLinks className="w-full md:hidden bg-white mt-3 p-3 rounded-3xl flex justify-between items-center gap-3">
        <NavLink
          to="/roadmap/planned"
          className="w-1/3 rounded-2xl text-center font-semibold text-slate-500 hover:bg-gray-100 p-2"
        >
          Planned
        </NavLink>
        <NavLink
          to="/roadmap/in-progress"
          className="w-1/3 rounded-2xl text-center font-semibold text-slate-500 hover:bg-gray-100 p-2"
        >
          In Progress
        </NavLink>
        <NavLink
          to="/roadmap/live"
          className="w-1/3 rounded-2xl text-center font-semibold text-slate-500 hover:bg-gray-100 p-2"
        >
          Live
        </NavLink>
      </RodmapLinks>

      <div className="w-full flex justify-center items-center flex-col md:hidden">
        <Outlet />
      </div>

      <div className="hidden mt-6 w-full md:flex h-full justify-between items-start gap-8">
        <div className="w-1/3 h-full">
          <section className="w-full ml-4 mb-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-700 mb-1">
              In-Progress
            </h1>
            <p className="text-slate-600">Hello from this</p>
          </section>

          <section className="w-full flex flex-col justify-center items-center gap-5">
            {data
              .filter((f) => f.roadmap === "in-progress")
              .map((feedback) => {
                return (
                  <FeedbackCard
                    isRoadmap={true}
                    key={Math.random()}
                    feedback={feedback}
                  />
                );
              })}
          </section>
        </div>
        <div className="w-1/3 h-full">
          <section className="w-full ml-4 mb-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-700 mb-1">
              Planned
            </h1>
            <p className="text-slate-600">Hello from this</p>
          </section>

          <section className="w-full flex flex-col justify-center items-center gap-5">
            {data
              .filter((f) => f.roadmap === "planned")
              .map((feedback) => {
                return (
                  <FeedbackCard
                    isRoadmap={true}
                    key={Math.random()}
                    feedback={feedback}
                  />
                );
              })}
          </section>
        </div>
        <div className="w-1/3 h-full">
          <section className="w-full ml-4 mb-2 text-center">
            <h1 className="text-2xl font-semibold text-slate-700 mb-1">Live</h1>
            <p className="text-slate-600">Hello from this</p>
          </section>

          <section className="w-full flex flex-col justify-center items-center gap-5">
            {data
              .filter((f) => f.roadmap === "live")
              .map((feedback) => {
                return (
                  <FeedbackCard
                    isRoadmap={true}
                    key={Math.random()}
                    feedback={feedback}
                  />
                );
              })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
