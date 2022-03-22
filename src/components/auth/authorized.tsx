import { useLocation, Navigate } from "react-router-dom";
import useLoggedIn from "./isLoggedIn";
import Loader from "../loader";

type Props = {
  guest?: boolean;
  redirect: string;
};

const Authorized: React.FC<Props> = ({ children, redirect, guest = false }) => {
  let loginStatus = useLoggedIn();
  let location = useLocation();

  console.log("AUTHORIZED");
  console.log(
    "isLoggedIn: ",
    loginStatus.isLoggedIn,
    "inverse: ",
    !loginStatus.isLoggedIn
  );
  console.log("Guest: ", guest, "inverse: ", !guest);

  // Show the loader while still loading user's login status
  if (loginStatus.isLoggedIn === null) {
    return <Loader />;
  }

  // for guest only || for auth only
  if (!guest && !loginStatus.isLoggedIn) {
    return <Navigate to={redirect} state={{ from: location }} replace />;
    // console.log("should redirect");
    // return <>{children} </>;
  }

  // console.log("should not redirect");
  return <>{children} </>;
};

export default Authorized;
