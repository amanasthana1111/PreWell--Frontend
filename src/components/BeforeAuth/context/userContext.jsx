import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "https://folify.onrender.com/api/auth",
          { withCredentials: true }
        );

        setIsAuth(true);
        setRes(response.data);
      } catch {
        setIsAuth(false);
        setRes(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ call after login API success
const login = async () => {
  try {
    const response = await axios.get(
      "https://folify.onrender.com/api/auth",
      { withCredentials: true }
    );
    setIsAuth(true);
    setRes(response.data);
  } catch (err) {
    setIsAuth(false);
    console.error("Login auth check failed", + err);
    
  }
};

  // ✅ call after logout API success
  const logout = () => {
    setIsAuth(false);
    setRes(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, loading, res, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
