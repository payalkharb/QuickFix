// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import useAuthStore from "../store/authStore";

// const BASE_URL = "http://localhost:5000/api";

// export default function MyBookings() {
//   const { token } = useAuthStore();
//   const [bookings, setBookings] = useState([]);
//   const [upcoming, setUpcoming] = useState([]);

//   // Modal state
//   const [activeModal, setActiveModal] = useState(null); // "cancel" | "reschedule" | "review"
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [newDate, setNewDate] = useState("");
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(5);

//   useEffect(() => {
//     fetchBookings();
//     fetchUpcoming();
//   }, []);

//   const authHeader = { Authorization: `Bearer ${token}` }; // change if backend doesn’t use Bearer

//   const fetchBookings = async () => {
//     if (!token) return; // avoid 401 spam if no token
//     try {
//       const res = await axios.get(`${BASE_URL}/bookings`, {
//         headers: authHeader,
//       });
//       setBookings(res.data);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error("Session expired, please log in again");
//       } else {
//         toast.error("Failed to fetch bookings");
//       }
//       console.error(err);
//     }
//   };

//   const fetchUpcoming = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${BASE_URL}/bookings/upcoming`, {
//         headers: authHeader,
//       });
//       setUpcoming(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const cancelBooking = async () => {
//     if (!selectedBooking) return;
//     try {
//       await axios.put(
//         `${BASE_URL}/bookings/cancel/${selectedBooking._id}`,
//         {},
//         { headers: authHeader }
//       );
//       toast.success("Booking cancelled");
//       setActiveModal(null);
//       fetchBookings();
//       fetchUpcoming();
//     } catch (err) {
//       console.error(err);
//       toast.error("Cancel failed");
//     }
//   };

//   const rescheduleBooking = async () => {
//     if (!selectedBooking || !newDate) return;
//     try {
//       await axios.put(
//         `${BASE_URL}/bookings/reschedule/${selectedBooking._id}`,
//         { bookingDate: newDate },
//         { headers: authHeader }
//       );
//       toast.success("Booking rescheduled");
//       setActiveModal(null);
//       setNewDate("");
//       fetchBookings();
//       fetchUpcoming();
//     } catch (err) {
//       console.error(err);
//       toast.error("Reschedule failed");
//     }
//   };

//   const reviewBooking = async () => {
//     if (!selectedBooking || !reviewText) return;
//     try {
//       await axios.put(
//         `${BASE_URL}/bookings/review/${selectedBooking._id}`,
//         { rating, review: reviewText }, // check your backend field names!
//         { headers: authHeader }
//       );
//       toast.success("Review submitted");
//       setActiveModal(null);
//       setReviewText("");
//       setRating(5);
//     } catch (err) {
//       if (err.response?.status === 400) {
//         toast.error("Invalid review format (check backend fields)");
//       } else {
//         toast.error("Review failed");
//       }
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

//       {/* Upcoming Bookings */}
//       <h2 className="text-xl mb-2">Upcoming</h2>
//       <div className="grid gap-4 md:grid-cols-2">
//         {upcoming.map((b) => (
//           <div key={b._id} className="card bg-base-200 p-4 shadow">
//             <h3 className="font-semibold">{b.serviceId?.title}</h3>
//             <p>
//               Technician: {b.technicianId?.name} ({b.technicianId?.phone})
//             </p>
//             <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
//             <p>Status: {b.status}</p>

//             <div className="mt-2 flex gap-2">
//               <button
//                 className="btn btn-sm btn-error"
//                 onClick={() => {
//                   setSelectedBooking(b);
//                   setActiveModal("cancel");
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-sm btn-warning"
//                 onClick={() => {
//                   setSelectedBooking(b);
//                   setActiveModal("reschedule");
//                 }}
//               >
//                 Reschedule
//               </button>
//               <button
//                 className="btn btn-sm btn-success"
//                 onClick={() => {
//                   setSelectedBooking(b);
//                   setActiveModal("review");
//                 }}
//               >
//                 Review
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* All Bookings */}
//       <h2 className="text-xl mt-6 mb-2">All Bookings</h2>
//       <div className="grid gap-4 md:grid-cols-2">
//         {bookings.map((b) => (
//           <div key={b._id} className="card shadow p-4">
//             <h3 className="text-lg font-bold">{b.service?.title}</h3>
//             <p>Status: {b.status}</p>

//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => cancelBooking(b._id)}
//                 className="btn btn-error btn-sm"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => rescheduleBooking(b._id)}
//                 className="btn btn-warning btn-sm"
//               >
//                 Reschedule
//               </button>
//               {b.status === "completed" && (
//                 <button
//                   onClick={() => reviewBooking(b._id)}
//                   className="btn btn-success btn-sm"
//                 >
//                   Review
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cancel Modal */}
//       {activeModal === "cancel" && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow w-96">
//             <h2 className="text-lg font-bold mb-4">Cancel Booking?</h2>
//             <p>Are you sure you want to cancel this booking?</p>
//             <div className="mt-4 flex justify-end gap-2">
//               <button className="btn" onClick={() => setActiveModal(null)}>
//                 No
//               </button>
//               <button className="btn btn-error" onClick={cancelBooking}>
//                 Yes, Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Reschedule Modal */}
//       {activeModal === "reschedule" && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow w-96">
//             <h2 className="text-lg font-bold mb-4">Reschedule Booking</h2>
//             <input
//               type="date"
//               className="input input-bordered w-full"
//               value={newDate}
//               onChange={(e) => setNewDate(e.target.value)}
//             />
//             <div className="mt-4 flex justify-end gap-2">
//               <button className="btn" onClick={() => setActiveModal(null)}>
//                 Cancel
//               </button>
//               <button className="btn btn-warning" onClick={rescheduleBooking}>
//                 Reschedule
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Review Modal */}
//       {activeModal === "review" && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow w-96">
//             <h2 className="text-lg font-bold mb-4">Leave a Review</h2>
//             <label className="block mb-2">Rating (1–5)</label>
//             <input
//               type="number"
//               min="1"
//               max="5"
//               className="input input-bordered w-full mb-4"
//               value={rating}
//               onChange={(e) => setRating(Number(e.target.value))}
//             />
//             <textarea
//               className="textarea textarea-bordered w-full mb-4"
//               placeholder="Write your review..."
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//             />
//             <div className="mt-2 flex justify-end gap-2">
//               <button className="btn" onClick={() => setActiveModal(null)}>
//                 Cancel
//               </button>
//               <button className="btn btn-success" onClick={reviewBooking}>
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// ------------------------------------------------
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";
import useBookingStore from "../store/bookingStore";

const BASE_URL = "http://localhost:5000/api";

export default function MyBookings() {
  const { token } = useAuthStore();
  const {
    bookings,
    upcoming,
    setBookings,
    setUpcoming,
    setSelectedBooking,
    selectedBooking,
  } = useBookingStore();

  // Local-only modal & form states
  const [activeModal, setActiveModal] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const authHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchBookings();
    fetchUpcoming();
  }, [token]);

  const fetchBookings = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${BASE_URL}/bookings`, {
        headers: authHeader,
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
      console.error(err);
    }
  };

  const fetchUpcoming = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${BASE_URL}/bookings/upcoming`, {
        headers: authHeader,
      });
      setUpcoming(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBooking = async () => {
    if (!selectedBooking) return;
    try {
      await axios.put(
        `${BASE_URL}/bookings/cancel/${selectedBooking._id}`,
        {},
        { headers: authHeader }
      );
      toast.success("Booking cancelled");
      setActiveModal(null);
      fetchBookings();
      fetchUpcoming();
    } catch (err) {
      toast.error("Cancel failed");
      console.error(err);
    }
  };

  const rescheduleBooking = async () => {
    if (!selectedBooking || !newDate) return;
    try {
      await axios.put(
        `${BASE_URL}/bookings/reschedule/${selectedBooking._id}`,
        { bookingDate: newDate },
        { headers: authHeader }
      );
      toast.success("Booking rescheduled");
      setActiveModal(null);
      setNewDate("");
      fetchBookings();
      fetchUpcoming();
    } catch (err) {
      toast.error("Reschedule failed");
      console.error(err);
    }
  };

  const reviewBooking = async () => {
    if (!selectedBooking || !reviewText) return;
    try {
      await axios.put(
        `${BASE_URL}/bookings/review/${selectedBooking._id}`,
        { rating, review: reviewText },
        { headers: authHeader }
      );
      toast.success("Review submitted");
      setActiveModal(null);
      setReviewText("");
      setRating(5);
      fetchBookings();
    } catch (err) {
      toast.error("Review failed");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {/* Upcoming Bookings */}
      <h2 className="text-xl mb-2">Upcoming</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {upcoming.map((b) => (
          <div key={b._id} className="card bg-base-200 p-4 shadow">
            <h3 className="font-semibold">{b.serviceId?.title}</h3>
            <p>
              Technician: {b.technicianId?.name} ({b.technicianId?.phone})
            </p>
            <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
            <p>Status: {b.status}</p>

            <div className="mt-2 flex gap-2">
              <button
                className="btn btn-sm btn-error"
                onClick={() => {
                  setSelectedBooking(b);
                  setActiveModal("cancel");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => {
                  setSelectedBooking(b);
                  setActiveModal("reschedule");
                }}
              >
                Reschedule
              </button>
              {b.status === "completed" && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => {
                    setSelectedBooking(b);
                    setActiveModal("review");
                  }}
                >
                  Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* All Bookings */}
      <h2 className="text-xl mt-6 mb-2">All Bookings</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {bookings.map((b) => (
          <div key={b._id} className="card shadow p-4">
            <h3 className="text-lg font-bold">{b.service?.title}</h3>
            <p>Status: {b.status}</p>

            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-error btn-sm"
                onClick={() => {
                  setSelectedBooking(b);
                  setActiveModal("cancel");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => {
                  setSelectedBooking(b);
                  setActiveModal("reschedule");
                }}
              >
                Reschedule
              </button>
              {b.status === "completed" && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    setSelectedBooking(b);
                    setActiveModal("review");
                  }}
                >
                  Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Modal */}
      {activeModal === "cancel" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-4">Cancel Booking?</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn" onClick={() => setActiveModal(null)}>
                No
              </button>
              <button className="btn btn-error" onClick={cancelBooking}>
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {activeModal === "reschedule" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-4">Reschedule Booking</h2>
            <input
              type="date"
              className="input input-bordered w-full"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn" onClick={() => setActiveModal(null)}>
                Cancel
              </button>
              <button className="btn btn-warning" onClick={rescheduleBooking}>
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {activeModal === "review" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-4">Leave a Review</h2>
            <label className="block mb-2">Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className="input input-bordered w-full mb-4"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <div className="mt-2 flex justify-end gap-2">
              <button className="btn" onClick={() => setActiveModal(null)}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={reviewBooking}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
