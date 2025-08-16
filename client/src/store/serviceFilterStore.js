import { create } from "zustand";

const useServiceFilterStore = create((set) => ({
  selectedSubService: "",
  filters: {
    priceRange: [0, 5000],
    availability: "any",
    sortBy: "",
  },
  setSelectedSubService: (sub) => set({ selectedSubService: sub }),
  setFilters: (f) =>
    set((state) => ({
      filters: { ...state.filters, ...f },
    })),
}));

export default useServiceFilterStore;
