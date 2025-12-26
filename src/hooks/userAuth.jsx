// hooks/userAuth.js
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const userAuth = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const checkAuth = async () => {
      try {
        const res1 = await axios.get(
          "https://prewell-backend-2.onrender.com/api/auth",
          { withCredentials: true }
        );
        setIsAuth(true);
        setRes(res1);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuth, loading, res };
};

export default userAuth;
