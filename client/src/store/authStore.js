// src/store/authStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  role: null,
  user: null,

  login: (token, role, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, role, user });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    set({ token: null, role: null, user: null });
  },

  restoreAuth: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && role && user) {
      set({ token, role, user });
    }
  },
}));

export default useAuthStore;
