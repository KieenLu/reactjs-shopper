// // import { useAuth } from "@/hooks/useAuth"
// import { useAuth } from "@/hooks/useAuth"
// import { Navigate, Outlet, useLocation } from "react-router-dom"

// export const AuthRoute = ({ redirect = '/' }) => {
//     const { user } = useAuth()
//     const {state} = useLocation()

//     if (user) return <Navigate to={state?.redirect || redirect} />

//     return <Outlet />
// }

// import { useAuth } from "@/hooks/useAuth"
import { useAuth } from "@/hooks/useAuth";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "../Navigate";

const AuthRoute = ({ redirect = "/" }) => {
  const { user } = useAuth();
  const { state, pathname, search } = useLocation();
  console.log(state);

  if (user)
    return (
      <Navigate
        to={state?.redirect || redirect}
        state={{ redirect: pathname + search }}
      />
    );

  return <Outlet />;
};

export default AuthRoute;
