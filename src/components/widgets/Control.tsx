import { FaMedapps } from "react-icons/fa";
import CreateFeedback from "./CreateFeedback";

const Control = ({ onSort }) => {
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
            className="bg-[#373e68] border-none font-bold rounded-xl outline-none !ring-0 hover:cursor-pointer text-white"
          >
            <option selected value="most-upvotes">
              Most Upvotes
            </option>
            <option value="most-comments">Most Comments</option>
          </select>
        </label>
      </section>

      <CreateFeedback />
    </article>
  );
};

export default Control;
