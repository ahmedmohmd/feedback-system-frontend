import HeadingCard from "./components/widgets/HeadingCard";
import Roadmap from "./components/widgets/Roadmap";
import Tags from "./components/widgets/Tags";

function App() {
  return (
    <div className="bg-[#f7f8fd] min-h-screen min-screen">
      <Roadmap />
      <HeadingCard />
      <Tags />
    </div>
  );
}

export default App;
