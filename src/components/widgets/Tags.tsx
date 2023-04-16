import { useEffect, useId, useState } from "react";

const TAGS = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

const Tags = ({ onTag }) => {
  const [tags, setTags] = useState<string[]>(["All"]);

  useEffect(() => {
    onTag(tags);
  }, [tags]);

  const handleClick = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    } else {
      setTags(
        tags.filter((t) => {
          if (t !== "All") {
            return t !== tag;
          } else {
            return true;
          }
        })
      );
    }
  };

  return (
    <article className="flex flex-wrap items-start justify-start gap-4 bg-white lg:w-80 rounded-2xl p-7">
      {TAGS.map((tag) => {
        return (
          <button
            key={Math.random()}
            className={`${
              tags.includes(tag)
                ? "text-white bg-[#4661e6]"
                : "hover:text-white hover:bg-[#4661e6] text-[#4661e6] bg-[#eaedfd]"
            } duration-150 py-2 px-4 rounded-xl font-bold`}
            onClick={() => handleClick(tag)}
          >
            {tag}
          </button>
        );
      })}
    </article>
  );
};

export default Tags;
