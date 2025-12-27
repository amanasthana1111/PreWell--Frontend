import { useEffect, useState } from "react";
import useUserAuth from "./hooks/useAuth";
import axios from "axios";


const Ats = () => {
  const isAuth = useUserAuth();
  const [isResumeUploaded , setResumeUploaded] = useState(null)
  const [Ats , setAts] = useState(null)

  useEffect(()=>{
    const check = async()=>{
      try {
        const response = await axios.get("https://prewell-backend-2.onrender.com/start/atsScanner",{
        withCredentials : true
      })
      setAts(response.data);
      setResumeUploaded(true)
      
      } catch (error) {
        setResumeUploaded(false)
      }
    }
  },[])

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (!isAuth) return null;
  

  return <div>
    {isResumeUploaded && <h1>OK</h1>}
    
  </div>;
};

export default Ats;
