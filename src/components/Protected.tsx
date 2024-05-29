import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Protected:React.FC<any> = ({children}) => {
    const navigate = useNavigate();
    const data:any = window.localStorage.getItem('fast-flip-user')

    useEffect(() => {
        // const { token, username } = data;
        // console.log(token,username)
        if(!data){
            navigate('/landing')
        }
    })
  return children
}

export default Protected;