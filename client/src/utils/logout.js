// src/utils/logout.js
import useAuthStore from "../store/authStore";

export default function logoutUser(navigate) {
  const logout = useAuthStore.getState().logout;
  logout(); // clears Zustand + localStorage
  navigate("/", { replace: true });
}
