import { Navigate } from "react-router";

function PublicRoute({ children }) {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("access_token");

  // If user is authenticated, redirect to dashboard
  return user && token ? <Navigate to="/dashboard" replace /> : children;
}

export default PublicRoute;
