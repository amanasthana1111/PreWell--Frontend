import React from "react";
import { useLocation } from "react-router-dom";
import useUserAuth from "./hooks/useAuth";

const Report = () => {
  const isAuth = useUserAuth();
    const { state } = useLocation();
  if (isAuth === null) {
    return <div>Loading...</div>;
  }
  console.log(state);
  return <div>Report</div>;
};

export default Report;
