// hooks/userAuth.js
import axios from "axios";
import { useEffect, useState } from "react";

const userAuth = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://prewell-backend-2.onrender.com/api/auth",
          { withCredentials: true }
        );
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuth, loading ,res };
};

export default userAuth;
