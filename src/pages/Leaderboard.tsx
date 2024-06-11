import Highscores from "../components/Highscores";
import Back from "../components/Back";

const Leaderboard = () => {

  return (
    <div className="container mx-auto p-4 flex items-center justify-center">
      <section className=" w-[90%] md:w-1/2 ">
        <div className="md:hidden">
          <Back/>
        </div>
        <h2 className="jersey text-3xl md:text-4xl font-bold mt-4 text-center">Fast Flip Leaderboard</h2>
        <section className="w-full mx-auto border border-black relative">
        <div className="hidden md:block absolute top-0 right-[110%]">
          <Back/>
        </div>
          <Highscores/>
        </section>
      </section>
    </div>
  )
}

export default Leaderboard;