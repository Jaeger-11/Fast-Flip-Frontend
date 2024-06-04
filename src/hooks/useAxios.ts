import axios from "axios";

const useAxios = axios.create({
    baseURL: 'https://fast-flip-backend.vercel.app/',
    headers:{
        "content-type": "application/json"
    }
})

useAxios.interceptors.request.use((config) => {
    const user:any = window.localStorage.getItem('fast-flip-user')
    const data = JSON.parse(user) || '';
    const authorization = `Bearer ${data.token}`;
    if(data){
        config.headers.Authorization = authorization
    }
    return config;
})


export default useAxios;