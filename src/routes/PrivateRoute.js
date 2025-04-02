import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  return !token ? <Navigate to="/login" replace /> : element;
};

export default PrivateRoute;