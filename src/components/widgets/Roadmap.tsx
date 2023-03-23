const ROADMAPS = [
  {
    name: "Planned",
    color: "bg-[#f49e85]",
    count: 2,
  },
  {
    name: "In-Progress",
    color: "bg-[#ae1feb]",
    count: 3,
  },
  {
    name: "Live",
    color: "bg-[#61bcfa]",
    count: 1,
  },
];

const Roadmap = () => {
  return (
    <article className="bg-white w-80 p-8 rounded-2xl ">
      <section className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl text-[#3b4374]">Roadmap</h3>
        <a className="text-[#4d65e7] font-medium underline" href="#">
          View
        </a>
      </section>

      <section>
        <ul>
          {ROADMAPS.map(({ name, color, count }) => {
            return (
              <li className="flex justify-between items-center">
                <section className="flex justify-center items-center g-10 ">
                  <span className={`w-2 h-2 ${color} rounded-full mr-3`} />
                  <span className="text-[#8993b0]">{name}</span>
                </section>

                <span className="text-[#627198] font-bold text-lg">
                  {count}
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
