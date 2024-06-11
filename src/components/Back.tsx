import { useNavigate } from "react-router-dom";

const Back = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(-1)} className="flex w-max cursor-pointer font-semibold items-center justify-center gap-1">
          <svg className="w-6" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.4092 16.4199L10.3492 13.55C10.1935 13.4059 10.0692 13.2311 9.98425 13.0366C9.89929 12.8422 9.85547 12.6321 9.85547 12.4199C9.85547 12.2077 9.89929 11.9979 9.98425 11.8035C10.0692 11.609 10.1935 11.4342 10.3492 11.29L13.4092 8.41992" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 21.4202H17C19.2091 21.4202 21 19.6293 21 17.4202V7.42017C21 5.21103 19.2091 3.42017 17 3.42017H7C4.79086 3.42017 3 5.21103 3 7.42017V17.4202C3 19.6293 4.79086 21.4202 7 21.4202Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          <p>Back</p>
        </div>
    )
}

export default Back