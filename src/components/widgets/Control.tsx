import { Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { FaMedapps } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import GlobalContext from "../../utils/globalContext";
import CreateFeedback from "./CreateFeedback";

const Control = () => {
  const { onSort } = useContext(GlobalContext);

  return (
    <article className="bg-[#373e68] text-white rounded-2xl p-4 md:py-5 md:px-6 h-24 flex justify-between items-center">
      <section className="flex justify-between items-center gap-6">
        <section className="md:flex justify-between items-center gap-6 hidden">
          <FaMedapps
            color="white"
            className="text-2xl md:text-4xl font-bold "
          />
          <span className="md:text-2xl font-bold">6 Suggestions</span>
        </section>
        <label className="flex justify-center items-center">
          <span> Sort By:</span>
          <select
            name="sort"
            onChange={(event: any) => onSort(event.target.value)}
            defaultValue="most-upvotes"
            className="bg-[#373e68] border-none font-bold rounded-xl outline-none !ring-0 hover:cursor-pointer text-white"
          >
            <option value="most-upvotes">Most Upvotes</option>
            <option value="most-comments">Most Comments</option>
          </select>
        </label>
      </section>

      <Link
        to="/create-feedback"
        className="group duration-300 flex justify-center items-center gap-2 p-1 py-4 md:py-3 md:px-4 md:!h-full h-14 w-14 md:w-auto rounded-full bg-primary md:hover:bg-purple-600 md:rounded-2xl font-bold"
      >
        <GoPlus className="md:group-hover:rotate-0 group-hover:rotate-180 duration-300 md:group-hover:scale-[1] group-hover:scale-[1.3] font-bold text-2xl md:text-xl " />
        <span className="flex-1 hidden text-sm md:block">Add Feedback</span>
      </Link>
    </article>
  );
};

export default Control;
