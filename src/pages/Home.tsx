import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Stats from '../components/Stats';
import React, { useState } from 'react';

const Home:React.FC = () => {
    const [showStats, setShowStats] = useState<boolean>(false);
    const { username } = useSelector((state:RootState) => state.user);
    const navigate = useNavigate();
    const selectCategory = () => { 
        navigate('/gameplay');
        window.location.reload()
    }

    const logOut = () => {
        window.localStorage.clear()
        navigate('/landing')
    }

  return (
    <div className='container mx-auto py-10 flex flex-col gap-6 h-svh justify-between'>
        <section className='flex justify-between items-center text-lg'>
            <p onClick={() => setShowStats(true)} className='cursor-pointer font-semibold'>Your Stats</p>
            <div className='flex gap-2 items-center'>
                <div className='cursor-pointer flex items-center gap-1'>
                    <p className='capitalize font-semibold text-xl'>{username}</p>
                    <svg fill="#000000" className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enableBackground="new 0 0 52 52"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"></path> </g></svg>
                </div>
            </div>
            <p className='cursor-pointer text-red-500 font-semibold' onClick={logOut}>Log Out</p>
        </section>

        <section>
            <h1 className='jersey text-center'>SELECT CATEGORY</h1>

            <section className='text-center w-max mx-auto flex flex-col gap-4 cursor-pointer my-4'>
                <p onClick={() => selectCategory()}  className='uppercase p-3 bg-black text-lightBg font-semibold rounded-md transition-all hover:scale-105 border-2 border-black'>PLAY GAME</p>
            </section>
        </section>

        <section className='flex justify-between items-center text-lg font-semibold'>
            <Link to='/'>View Instructions</Link>
            <Link to='/leaderboard'>Leaderboard</Link>
        </section>

        { showStats && <Stats setShowStats={setShowStats}/>}
    </div>
  )
}

export default Home