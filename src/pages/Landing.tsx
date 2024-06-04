import { Link } from "react-router-dom";
import React,{ useState } from "react";
import Authentication from "../components/Authentication";

const Home:React.FC = () => {
    const  [ showAuth, setShowAuth ] = useState<boolean>(false)
  return (
    <div className="w-full h-svh p-[5%] flex justify-between items-center">
        <main className="grid md:grid-cols-1 gap-4 max-w-5xl mx-auto">
            <article className="flex flex-col gap-4 text-center">
                <h1>Welcome to <span className="italic text-blueLagoon underline">Fast-Flip</span></h1>
                <p className="text-lg">How fast are you? Can you memorize? How are your matching skills, <br /> I bet you can't break the highscore. Try it! </p>
                <button className="w-max mx-auto bg-blueLagoon text-lightBg px-6 py-2 play-btn jersey text-2xl" onClick={() => setShowAuth((showAuth) => !showAuth)}>PLAY GAME</button>

                <section className="flex justify-between items-center mt-10 text-lg">
                    <Link to='/about' className="underline hover:text-blueLagoon">About Fast-Flip</Link>
                    <Link to='/leaderboard' className="underline hover:text-blueLagoon">View Leaderboard</Link>
                </section>
            </article>
        </main>

        {
            showAuth && <Authentication setShowAuth={setShowAuth}/>
        }
    </div>
  )
}

export default Home