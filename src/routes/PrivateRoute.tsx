import { Navigate } from "react-router";
import { UserAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  return <>{session ? <>{children}</> : <Navigate to="/login" />}</>;
};
