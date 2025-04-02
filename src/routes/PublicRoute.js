import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/posts" replace /> : element;
};

export default PublicRoute;