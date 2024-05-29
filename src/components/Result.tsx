import React from 'react';
import { useNavigate } from 'react-router-dom';

interface details{
    score: number;
    flips: number;
    mismatch: number;
    timetaken: number;
}

const Result: React.FC<details> = (data) => {
    const navigate = useNavigate();
    // fetch Player scores and filter for all time best
    const playAgain = () => {
        // push scores to DB
        navigate(0)
    }

    const backHome = () => {
        navigate('/')
    }

  return (
    <div className="w-full h-full flex justify-between items-center absolute top-0 left-0 transition-all auth-container">
        <section className='w-max mx-auto text-center relative'>
            <svg fill="#000000" onClick={backHome} className="w-8 absolute top-0 right-0 cursor-pointer" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg>
            <article className='bg-lightBg p-4 rounded-sm shadow-lg'>
                <>
                <h3 className='text-2xl md:text-3xl jersey text-center'>Your Score</h3>
                <h1 className='text-center mb-4'>{data.score}</h1>
                </>
                
                <section>
                    <div className='flex gap-4'>
                        <p className='text-gray-600'> <span className='font-semibold text-black'>{data.flips}</span> Total Flips </p>
                        <p className='text-gray-600'> <span className='font-semibold text-black'>{data.mismatch}</span> Mismatch </p>
                        <p className='text-gray-600'> In <span className='font-semibold text-black'>{data.timetaken} seconds</span></p>
                    </div>
                </section>

                <p className='text-center my-2'>Your top score - <span className='font-semibold text-black'>900</span></p>
                <div className=''>
                    {/* <button className="border font-semibold p-2 w-max">Home</button> */}
                    <button onClick={playAgain} className='mx-auto w-max jersey text-2xl bg-black text-white'> Play Again </button>
                </div>
            </article>
        </section>
    </div>
  )
}

export default Result