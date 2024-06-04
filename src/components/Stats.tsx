import React, { useEffect, useState } from 'react'
import { StatsComponentProps, Stats as statsProps } from '../types/interface'
import useAxios from '../hooks/useAxios'

const Stats:React.FC<StatsComponentProps> = ({setShowStats}) => {
    const [ stats, setStats ] = useState<statsProps>({
        count: 0,
        totalTimeTaken: 0,
        averageTimeTaken: 0,
        totalScores: 0,
        averageScore: 0,
        topScore: 0
    })

    const fetchStats = async () => {
        try {
            const response = await useAxios.get('/scores/');
            setStats(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchStats();
    }, [])

  return (
    <div className="auth-container w-full h-full flex justify-between items-center absolute top-0 left-0 transition-all p-4">
      <section className="p-4 bg-lightBg min-w-[300px] max-w-4xl mx-auto relative rounded-sm">
      <svg fill="#000000" onClick={() => setShowStats(false)} className="w-6 absolute top-0 right-0 cursor-pointer" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg>
          <h2 className='jersey'>Your Stats</h2>
          <section className='grid grid-cols-2 gap-2 mt-4 items-start'>
            <div className='flex items-center gap-1'>
                <p>Games Played:</p>
                <p className='font-semibold'>{stats.count}</p>
            </div>
            <div className='flex items-center gap-1'>
                <p>Top Score:</p>
                <p className='font-semibold'>{stats.topScore}</p>
            </div>
            <div className='flex items-center gap-1'>
                <p>Total Score:</p>
                <p className='font-semibold'>{stats.totalScores}</p>
            </div>
            <div className='flex items-center gap-1'>
                <p>Total Time Taken:</p>
                <p className='font-semibold'>{stats.totalTimeTaken} seconds</p>
            </div>
            <div className='flex items-center gap-1'>
                <p>Average Score:</p>
                <p className='font-semibold'>{stats.averageScore}</p>
            </div>
            <div className='flex items-center gap-1'>
                <p>Average Time Taken:</p>
                <p className='font-semibold'>{stats.averageTimeTaken}</p>
            </div>
          </section>
      </section>
    </div>
  )
}

export default Stats