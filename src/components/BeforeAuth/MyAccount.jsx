import React from 'react'
import useUserAuth from './hooks/useuserAuth';

function MyAccount() {
  const isAuth = useUserAuth();
  
    if (isAuth === null) {
      return <div>Loading...</div>;
    }
  
    if (!isAuth) return null;
  return (
    <>
    
    </>
  )
}

export default MyAccount