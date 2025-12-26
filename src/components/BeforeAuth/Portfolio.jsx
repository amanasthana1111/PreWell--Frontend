import React from 'react'
import useUserAuth from './hooks/useuserAuth';

export const Portfolio = () => {
  const isAuth = useUserAuth();
  
    if (isAuth === null) {
      return <div>Loading...</div>;
    }
  
    if (!isAuth) return null;
  return (
    <div>Portfolio</div>
  )
}
