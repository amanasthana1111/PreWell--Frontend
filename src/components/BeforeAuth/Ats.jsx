import useUserAuth from "./hooks/useuserAuth";

const Ats = () => {
  const isAuth = useUserAuth();

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (!isAuth) return null;

  return <div>Ats</div>;
};

export default Ats;
