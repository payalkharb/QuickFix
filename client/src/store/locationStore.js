import { create } from "zustand";

const useLocationStore = create((set) => ({
  location: localStorage.getItem("location") || "",

  setLocation: (location) => {
    localStorage.setItem("location", location);
    set({ location });
  },

  clearLocation: () => {
    localStorage.removeItem("location");
    set({ location: "" });
  },
}));

export default useLocationStore;
