import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ role }) {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  if (!token || storedRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
