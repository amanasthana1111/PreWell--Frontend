import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const useUserAuth = () => {
  const { isAuth, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuth === false) {
      navigate("/login");
    }
  }, [isAuth, loading, navigate]);

  return isAuth;
};

export default useUserAuth;
