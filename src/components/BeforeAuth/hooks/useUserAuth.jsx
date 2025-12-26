import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const useUserAuth = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return isAuth; // return state, NOT JSX
};

export default useUserAuth;
