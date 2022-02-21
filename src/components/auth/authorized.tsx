import { useLocation, Navigate } from "react-router-dom";
import useLoggedIn from "./isLoggedIn";

type Props = {
  guest?: boolean;
  redirect: string;
};

const Authorized: React.FC<Props> = ({ children, redirect, guest = false }) => {
  let isLoggedIn = useLoggedIn();
  let location = useLocation();

  // for guest only || for auth only
  if ((guest && isLoggedIn) || (!guest && !isLoggedIn)) {
    return <Navigate to={redirect} state={{ from: location }} replace />;
  }

  return <>{children} </>;
};

export default Authorized;
