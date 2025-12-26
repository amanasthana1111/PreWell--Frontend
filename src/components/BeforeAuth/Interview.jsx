import React from "react";
import useUserAuth from "./hooks/useUserAuth";

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
