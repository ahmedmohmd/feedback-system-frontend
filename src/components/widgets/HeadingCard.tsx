import styled from "@emotion/styled";

const HeadingCardStyle = styled.article(`
  background: rgb(113,179,247);
  background: linear-gradient(
              103deg, 
              rgba(113,179,247,1) 0%, 
              rgba(132,97,246,1) 21%, 
              rgba(185,76,208,1) 37%, 
              rgba(220,77,135,1) 70%, 
              rgba(236,127,102,1) 85%, 
              rgba(234,153,143,1) 100% );
`);

const HeadingCard = () => {
  return (
    <HeadingCardStyle className="w-80 h-48 rounded-2xl p-8 flex justify-start items-end">
      <section className="text-white pt-4">
        <h3 className="text-3xl font-bold mb-1">Frontend Mentor</h3>
        <span className=" text-white/80 font-normal text-xl">
          Feedback Board
        </span>
      </section>
    </HeadingCardStyle>
  );
};

export default HeadingCard;
