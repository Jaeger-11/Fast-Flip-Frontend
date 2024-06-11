import Back from "../components/Back";

const data = [
  {
    point: "Sign Up",
    text: "Create an account to start playing and track your progress."
  },
  {
    point: "Start a Game",
    text: "Choose a difficulty level to begin. The game board will be filled with flipped cards."
  },
  {
    point: "Flip Cards",
    text: "Click on any two cards to flip them over."
  },
  {
    point: "Match Cards",
    text: "If the cards match, they stay flipped. If not, they flip back."
  },
  {
    point: "Win the Game",
    text: "Match all the card pairs to win!"
  },
  {
    point: "Top One",
    text: "Try top the leaderboard"
  }
]

const tips = [
  {
    point: "Focus",
    text: "Concentrate and remember card positions."
  },
  {
    point: "Speed",
    text: "Try to match cards quickly to improve your time."
  }
]

const About = () => {
  return (
    <div className="md:py-10 p-4 flex justify-center items-center w-full">
      <main className="flex flex-col gap-4 container">
        <Back/>
        <article className="lg:mx-8">
          <h2 className="font-semibold italic md:text-2xl">Welcome to Fast-Flip!</h2>
          <h4>Fast-Flip is a memory card matching game designed to challenge and entertain you. Here's how to play:</h4>

          <ul className="m-4 flex flex-col gap-2 text-base">
            {data.map(({point,text}) => {
              return <li><span className="font-semibold">{point}: </span>{text}</li>
            })}
          </ul> 

          <section className="my-6">
            <h3 className="font-semibold text-xl md:text-2xl">Tips</h3>
            <ul className="m-4 flex flex-col gap-2 text-base">
            {tips.map(({point,text}) => {
              return <li><span className="font-semibold">{point}: </span>{text}</li>
            })}
          </ul> 
          </section>
        </article>
      </main>
    </div>
  )
}

export default About