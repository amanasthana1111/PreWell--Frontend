import React from "react";
import useUserAuth from "./hooks/useAuth";

const Interview = () => {
  const isAuth = useUserAuth();

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>Interview</div>
  );
};

export default Interview;
