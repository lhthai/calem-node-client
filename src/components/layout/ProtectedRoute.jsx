import { Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  // const location = useLocation();
  // const { auth } = useAuth();

  // return !auth ? (
  //   <Navigate to="/signin" state={{ from: location }} replace />
  // ) : (
  //   <Outlet />
  // );
  return <Outlet />;
};
