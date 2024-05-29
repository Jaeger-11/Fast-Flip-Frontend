import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthComponentProps, AuthUser } from "../types/interface";
import useAxios from "../hooks/useAxios";

const Authentication: React.FC<AuthComponentProps> = ({setShowAuth}) => {

  const navigate = useNavigate();
  const [ newAccount, setNewAccount ] = useState<Boolean>(true);
  const [ authDetails, setAuthDetails ] = useState<AuthUser>({username:"", email:"", password:""})
  
  const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    let newUserData = { [target.name] : target.value }
    setAuthDetails({...authDetails, ...newUserData})
  }

  const handleLoginSubmit = async () => {
    window.localStorage.clear()
    try {
      const response = await useAxios.post('/auth/login/', {email:authDetails.email, password:authDetails.password});
      window.localStorage.setItem('fast-flip-user', JSON.stringify(response.data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignupSubmit = async () => {
    window.localStorage.clear()
    try {
      const response = await useAxios.post('/auth/signup/', authDetails);
      window.localStorage.setItem('Fast-flip-user', JSON.stringify(response.data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const switchAuthenticationType = () => {
    setNewAccount((newAccount) => !newAccount)
    setAuthDetails({username:"", email:"", password:""})
  }

  return (
    <div className="auth-container w-full h-full flex justify-between items-center absolute top-0 left-0 transition-all">
      <section className="p-4 bg-lightBg sm:min-w-[300px] md:min-w-[500px] max-w-4xl mx-auto relative rounded-sm">
        <article className="">
            <svg fill="#000000" onClick={() => setShowAuth(false)} className="w-8 absolute top-0 right-0 cursor-pointer" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g></svg>            <h2 className=" font-bold text-3xl jersey uppercase">{ newAccount ? 'Create Account' : 'Login'}</h2>
            <form className="">
                { newAccount ?
                <div>
                    <input type="text" required placeholder="Username" id="username" name="username" 
                    onChange={handleInput}
                    className="p-2 my-1 w-full rounded-sm text-blueLagoon focus:outline-none border-b text-base placeholder:text-base"/>
                </div> : ''
                }
                
                <div>
                    <input type="text" placeholder="Email" id="email" name="email" 
                    onChange={handleInput}
                    className="p-2 my-1 w-full rounded-sm text-blueLagoon focus:outline-none border-b text-base placeholder:text-base"/>
                </div>
                <div>
                    <input type="password" name="password" id="password" placeholder="Password" 
                    onChange={handleInput}
                    min={6}
                    className="p-2 my-1 w-full rounded-sm text-blueLagoon focus:outline-none border-b text-base placeholder:text-base"/>
                </div>
                <p className="text-red-600 font-medium text-xs">{}</p>
                <button 
                type="button"
                onClick={newAccount ? handleSignupSubmit : handleLoginSubmit} 
                className="text-white bg-blueLagoon p-2 rounded-sm my-2 hover:scale-95 transition-all"> 
                { newAccount ? 'Create Account' : 'Log In'} 
                </button>

                <p className="text-gray-500 text-sm text-right"> 
                { newAccount ? 'Already a player? ' : 'No account yet? '}
                <span className="text-highlight underline font-bold transition-all text-black cursor-pointer" 
                onClick={switchAuthenticationType}
                >
                { newAccount ? 'Login' : 'Create Account'}
                </span>
                
                </p>
            </form>
        </article>    
      </section>
    </div>
  )
}

export default Authentication;