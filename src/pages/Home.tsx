import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    let user = window.localStorage.getItem('fast-flip-user') || '';
    let username:string = '';
    if (user) {
        user = JSON.parse(user);
      } else {
        user = '';
      }
    const data:string[] = ['heroes','celebrities','random','cars','clothings'];
    let category:string = "random"
    const selectCategory = (name:string) => { 
        category = name;
        console.log(category)
        navigate('/gameplay')
    }

    const logOut = () => {
        window.localStorage.clear()
        navigate('/landing')
    }

  return (
    <div className='container mx-auto py-10 flex flex-col gap-6'>
        <section className='flex justify-between items-center text-lg'>
            <Link to='/'>Your Stats</Link>
            <div className='flex gap-2 items-center'>
                <div className='cursor-pointer flex items-center gap-1'>
                    <p className='capitalize'>{username}</p>
                    <svg fill="#000000" className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" enableBackground="new 0 0 52 52"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z"></path> </g></svg>
                </div>
                {/* <svg viewBox="0 0 15 15" className='w-4' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.49988 12L-0.00012207 4L14.9999 4L7.49988 12Z" fill="#000000"></path> </g></svg> */}
                {/* <p>icon</p> */}
            </div>
            <p className='cursor-pointer text-red-500 font-semibold' onClick={logOut}>Log Out</p>
        </section>

        <section>
            <h1 className='jersey text-center'>SELECT CATEGORY</h1>

            <section className='text-center w-max mx-auto flex flex-col gap-4 cursor-pointer my-4'>
                {data.map((name) => {
                    return <p key={name} onClick={() => selectCategory(name)} className='uppercase p-3 hover:bg-blueLagoon hover:text-lightBg font-semibold rounded-md transition-all hover:scale-105 bg-transparent text-blueLagoon border-2 border-blueLagoon'>{name}</p>
                })}
            </section>
        </section>

        <section className='flex justify-between items-center text-lg'>
            <Link to='/'>View Instructions</Link>
            <Link to='/leaderboard'>Leaderboard</Link>
        </section>
    </div>
  )
}

export default Home