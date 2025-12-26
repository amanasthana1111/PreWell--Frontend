import React from 'react'
import useUserAuth from './hooks/useuserAuth';

const Interview = () => {
  const isAuth = useUserAuth();
  
    if (isAuth === null) {
      return <div>Loading...</div>;
    }
  
    if (!isAuth) return null;
  return (
    <div>Interview</div>
  )
}

export default Interview