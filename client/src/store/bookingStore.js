// src/store/bookingStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookingStore = create(
  persist(
    (set) => ({
      bookings: [],
      upcoming: [],
      selectedBooking: null,

      setBookings: (bookings) => set({ bookings }),
      setUpcoming: (upcoming) => set({ upcoming }),
      setSelectedBooking: (booking) => set({ selectedBooking: booking }),
      clearBookings: () =>
        set({ bookings: [], upcoming: [], selectedBooking: null }),
    }),
    {
      name: "booking-storage", // key in localStorage
    }
  )
);

export default useBookingStore;
