import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function AutoLoginRedirector() {
  const { token, role } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && role && location.pathname === "/") {
      navigate(`/${role}/dashboard`);
    }
  }, [token, role, location, navigate]);

  return null;
}
