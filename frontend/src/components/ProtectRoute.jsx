import { Navigate } from "react-router";

function ProtectRoute({ children }) {
  const user = localStorage.getItem("user");
  console.log(user);
  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectRoute;
