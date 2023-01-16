// import { useAuth } from "@/hooks/useAuth"
import { useAuth } from "@/hooks/useAuth";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "../Navigate";

const PrivateRoute = ({ redirect = "/" }) => {
  const { user } = useAuth();
  const { state, pathname, search } = useLocation();

  if (!user)
    return (
      <Navigate
        to={state?.redirect || redirect}
        state={{ redirect: pathname + search }}
      />
    );

  return <Outlet />;
};
export default PrivateRoute;
