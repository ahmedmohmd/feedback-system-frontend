const TAGS = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

const Tags = () => {
  return (
    <article className="w-80  rounded-2xl p-7 flex justify-start items-start gap-4 flex-wrap bg-white">
      {TAGS.map((tag) => {
        return (
          <a
            href="#"
            className="hover:text-white hover:bg-[#4661e6] duration-150 py-2 px-4 rounded-xl bg-[#eaedfd] font-bold text-[#4661e6]"
          >
            {tag}
          </a>
        );
      })}
    </article>
  );
};

export default Tags;
