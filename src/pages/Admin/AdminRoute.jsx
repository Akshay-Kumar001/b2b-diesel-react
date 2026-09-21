import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function AdminRoute() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;