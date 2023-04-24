import { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../utils/globalContext";

const ROADMAPS = [
  {
    name: "Planned",
    color: "bg-[#f49e85]",
    value: "planned",
  },
  {
    name: "In-Progress",
    color: "bg-[#ae1feb]",
    value: "in-progress",
  },
  {
    name: "Live",
    color: "bg-[#61bcfa]",
    value: "live",
  },
];

const Roadmap = () => {
  const {
    feedbacks: { data },
  } = useContext(GlobalContext);

  return (
    <article className="bg-white lg:w-80 p-8 rounded-2xl ">
      <section className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl text-[#3b4374]">Roadmap</h3>
        <Link to="/roadmap" className="text-[#4d65e7] font-medium underline">
          View
        </Link>
      </section>

      <section>
        <ul>
          {ROADMAPS.map(({ name, color, value }) => {
            return (
              <li key={name} className="flex justify-between items-center">
                <section className="flex justify-center items-center g-10 ">
                  <span className={`w-2 h-2 ${color} rounded-full mr-3`} />
                  <span className="text-[#8993b0]">{name}</span>
                </section>

                <span className="text-[#627198] font-bold text-lg">
                  {data.filter((feedback) => feedback.roadmap === value).length}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
};

export default Roadmap;
