import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/userSlice";

const Protected:React.FC<any> = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data:any = window.localStorage.getItem('fast-flip-user')

    useEffect(() => {
        if(!data){
            navigate('/landing')
        } else {
            const {username} = JSON.parse(data);
            dispatch(userLoggedIn(username));
        }
    })
  return children
}

export default Protected;