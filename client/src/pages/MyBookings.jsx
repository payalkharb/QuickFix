// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import useAuthStore from "../store/authStore";
// import useBookingStore from "../store/bookingStore";
// import { useNavigate } from "react-router-dom";
// import { Calendar, User, Phone, Star, XCircle, RefreshCcw } from "lucide-react";

// export default function MyBookings() {
//   const { token } = useAuthStore();
//   const {
//     bookings,
//     upcoming,
//     setBookings,
//     setUpcoming,
//     setSelectedBooking,
//     selectedBooking,
//   } = useBookingStore();

//   const [activeModal, setActiveModal] = useState(null);
//   const [newDate, setNewDate] = useState("");
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(5);

//   const authHeader = { Authorization: `Bearer ${token}` };
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBookings();
//     fetchUpcoming();
//   }, [token]);

//   const fetchBookings = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${BASE_URL}/bookings`, {
//         headers: authHeader,
//       });
//       const pastBookings = res.data.filter((b) => b.status === "completed");
//       setBookings(pastBookings);
//     } catch {
//       toast.error("Failed to fetch bookings");
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
//     } catch {
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
//     } catch {
//       toast.error("Reschedule failed");
//     }
//   };

//   const reviewBooking = async () => {
//     if (!selectedBooking || !reviewText) return;
//     try {
//       await axios.put(
//         `${BASE_URL}/bookings/review/${selectedBooking._id}`,
//         { rating, review: reviewText },
//         { headers: authHeader }
//       );
//       toast.success("Review submitted");
//       setActiveModal(null);
//       setReviewText("");
//       setRating(5);
//       fetchBookings();
//     } catch {
//       toast.error("Review failed");
//     }
//   };

//   // ✅ helper: check if review allowed (within 24h of completion)
//   const canLeaveReview = (completedAt) => {
//     if (!completedAt) return false;
//     const now = new Date();
//     const completedTime = new Date(completedAt);
//     const diffHours = (now - completedTime) / (1000 * 60 * 60);
//     return diffHours <= 24; // ✅ allow within 24h
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
//       {/* Header */}
//       <div className="bg-primary text-white rounded-xl shadow-md p-6 mb-8 text-center">
//         <h1 className="text-3xl font-extrabold flex items-center justify-center gap-2">
//           <Calendar size={26} /> My Bookings
//         </h1>
//       </div>

//       {/* Upcoming */}
//       <h2 className="text-xl font-semibold mb-4 text-primary">Upcoming</h2>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {upcoming.map((b) => (
//           <div
//             key={b._id}
//             className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer"
//             onClick={() => navigate(`/book/${b.serviceId?._id}`)}
//           >
//             <h3 className="font-bold text-lg text-primary flex items-center justify-between">
//               {b.serviceId?.title}
//               <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-600">
//                 {b.serviceId?.category}
//               </span>
//             </h3>

//             <p className="flex items-center gap-2 mt-2 text-gray-700">
//               <User size={16} /> {b.technicianId?.name}
//             </p>
//             <p className="flex items-center gap-2 text-gray-600 text-sm">
//               <Phone size={14} className="text-green-500" />{" "}
//               {b.technicianId?.phone}
//             </p>
//             <p className="flex items-center gap-2 text-gray-500 text-sm mt-1">
//               <Calendar size={16} className="text-pink-500" />{" "}
//               {new Date(b.bookingDate).toLocaleDateString()}
//             </p>

//             <span
//               className={`inline-block mt-3 px-2 py-1 text-xs rounded-full ${
//                 b.status === "pending"
//                   ? "bg-yellow-100 text-yellow-700"
//                   : b.status === "completed"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {b.status}
//             </span>

//             {/* Actions */}
//             <div className="mt-4 flex gap-2">
//               {/* ✅ cancel/reschedule only if pending */}
//               {b.status === "pending" && (
//                 <>
//                   <button
//                     className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedBooking(b);
//                       setActiveModal("cancel");
//                     }}
//                   >
//                     <XCircle size={14} /> Cancel
//                   </button>
//                   <button
//                     className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm hover:bg-yellow-200"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedBooking(b);
//                       setActiveModal("reschedule");
//                     }}
//                   >
//                     <RefreshCcw size={14} /> Reschedule
//                   </button>
//                 </>
//               )}
//               {/* ✅ review only if completed & within 24h */}
//               {b.status === "completed" && canLeaveReview(b.bookingDate) && (
//                 <button
//                   className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm hover:bg-green-200"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedBooking(b);
//                     setActiveModal("review");
//                   }}
//                 >
//                   <Star size={14} /> Review
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Past Bookings */}
//       <h2 className="text-xl font-semibold mt-12 mb-4 text-primary">
//         Past Bookings
//       </h2>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer"
//             onClick={() => navigate(`/book/${b.serviceId?._id}`)}
//           >
//             <h3 className="text-md font-bold text-primary">
//               {b.serviceId?.title}
//             </h3>
//             <p className="flex items-center gap-2 text-gray-600 text-sm mt-1">
//               <User size={16} /> {b.technicianId?.name}
//             </p>
//             <p className="flex items-center gap-2 text-gray-500 text-sm">
//               <Calendar size={16} />{" "}
//               {new Date(b.bookingDate).toLocaleDateString()}
//             </p>
//             <p className="mt-2 text-sm">
//               Status:{" "}
//               <span className="px-2 py-0.5 text-xs rounded-full border border-gray-300">
//                 {b.status}
//               </span>
//             </p>

//             {b.review && (
//               <div className="mt-3">
//                 <div className="flex items-center gap-1 text-yellow-500">
//                   {Array.from({ length: b.rating }).map((_, i) => (
//                     <Star key={i} size={14} fill="currentColor" />
//                   ))}
//                 </div>
//                 <p className="italic text-xs text-gray-600 mt-1">
//                   "{b.review}"
//                 </p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Cancel Modal */}
//       {activeModal === "cancel" && (
//         <Modal
//           title="Cancel Booking?"
//           onClose={() => setActiveModal(null)}
//           onConfirm={cancelBooking}
//           confirmLabel="Yes, Cancel"
//           confirmClass="bg-red-600 hover:bg-red-700 text-white"
//         >
//           Are you sure you want to cancel this booking?
//         </Modal>
//       )}

//       {/* Reschedule Modal */}
//       {activeModal === "reschedule" && (
//         <Modal
//           title="Reschedule Booking"
//           onClose={() => setActiveModal(null)}
//           onConfirm={rescheduleBooking}
//           confirmLabel="Reschedule"
//           confirmClass="bg-yellow-500 hover:bg-yellow-600 text-white"
//         >
//           <input
//             type="date"
//             className="input input-bordered w-full border border-gray-300 rounded-md p-2"
//             value={newDate}
//             onChange={(e) => setNewDate(e.target.value)}
//           />
//         </Modal>
//       )}

//       {/* Review Modal */}
//       {activeModal === "review" && (
//         <Modal
//           title="Leave a Review"
//           onClose={() => setActiveModal(null)}
//           onConfirm={reviewBooking}
//           confirmLabel="Submit"
//           confirmClass="bg-green-600 hover:bg-green-700 text-white"
//         >
//           <label className="block mb-2 font-medium text-sm">Rating</label>
//           <input
//             type="number"
//             min="1"
//             max="5"
//             className="input input-bordered w-full mb-4 border border-gray-300 rounded-md p-2"
//             value={rating}
//             onChange={(e) => setRating(Number(e.target.value))}
//           />
//           <textarea
//             className="textarea textarea-bordered w-full border border-gray-300 rounded-md p-2"
//             placeholder="Write your review..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

// function Modal({
//   title,
//   children,
//   onClose,
//   onConfirm,
//   confirmLabel,
//   confirmClass,
// }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white rounded-xl shadow-xl w-96 p-6 border border-gray-200">
//         <h2 className="text-lg font-bold mb-4 text-primary">{title}</h2>
//         {children}
//         <div className="mt-6 flex justify-end gap-2">
//           <button className="px-4 py-2 rounded-md border" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className={`px-4 py-2 rounded-md ${confirmClass}`}
//             onClick={onConfirm}
//           >
//             {confirmLabel}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";
import useBookingStore from "../store/bookingStore";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  User,
  Phone,
  Star,
  XCircle,
  RefreshCcw,
  CheckCircle,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api";

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

  const [activeModal, setActiveModal] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const authHeader = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();

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
      const pastBookings = res.data.filter((b) => b.status === "completed");
      setBookings(pastBookings);
    } catch {
      toast.error("Failed to fetch bookings");
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
    } catch {
      toast.error("Cancel failed");
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
    } catch {
      toast.error("Reschedule failed");
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
    } catch {
      toast.error("Review failed");
    }
  };

  // ✅ customer confirms service completion
  const confirmCompletion = async (bookingId) => {
    try {
      await fetch(`${BASE_URL}/bookings/customer/status/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "completed" }),
      });

      toast.success("Service marked as completed");
      fetchBookings();
      fetchUpcoming();
    } catch {
      toast.error("Failed to confirm completion");
    }
  };

  // ✅ helper: check if review allowed (within 24h of completion)
  const canLeaveReview = (completedAt) => {
    if (!completedAt) return false;
    const now = new Date();
    const completedTime = new Date(completedAt);
    const diffHours = (now - completedTime) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-6">
      {/* Header */}
      <div className="bg-primary text-white rounded-xl shadow-md p-6 mb-8 text-center">
        <h1 className="text-3xl font-extrabold flex items-center justify-center gap-2">
          <Calendar size={26} /> My Bookings
        </h1>
      </div>

      {/* Upcoming */}
      <h2 className="text-xl font-semibold mb-4 text-primary">Upcoming</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {upcoming.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/book/${b.serviceId?._id}`)}
          >
            <h3 className="font-bold text-lg text-primary flex items-center justify-between">
              {b.serviceId?.title}
              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-600">
                {b.serviceId?.category}
              </span>
            </h3>

            <p className="flex items-center gap-2 mt-2 text-gray-700">
              <User size={16} /> {b.technicianId?.name}
            </p>
            <p className="flex items-center gap-2 text-gray-600 text-sm">
              <Phone size={14} className="text-green-500" />{" "}
              {b.technicianId?.phone}
            </p>
            <p className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <Calendar size={16} className="text-pink-500" />{" "}
              {new Date(b.bookingDate).toLocaleDateString()}
            </p>

            {/* Status */}
            {b.status === "completion_requested" ? (
              <div className="mt-3">
                <button
                  className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm hover:bg-green-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmCompletion(b._id);
                  }}
                >
                  <CheckCircle size={14} /> Confirm Completion
                </button>
              </div>
            ) : (
              <span
                className={`inline-block mt-3 px-2 py-1 text-xs rounded-full ${
                  b.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : b.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {b.status}
              </span>
            )}

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              {b.status === "pending" && (
                <>
                  <button
                    className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBooking(b);
                      setActiveModal("cancel");
                    }}
                  >
                    <XCircle size={14} /> Cancel
                  </button>
                  <button
                    className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm hover:bg-yellow-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBooking(b);
                      setActiveModal("reschedule");
                    }}
                  >
                    <RefreshCcw size={14} /> Reschedule
                  </button>
                </>
              )}
              {b.status === "completed" && canLeaveReview(b.completedAt) && (
                <button
                  className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm hover:bg-green-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBooking(b);
                    setActiveModal("review");
                  }}
                >
                  <Star size={14} /> Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Past Bookings */}
      <h2 className="text-xl font-semibold mt-12 mb-4 text-primary">
        Past Bookings
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/book/${b.serviceId?._id}`)}
          >
            <h3 className="text-md font-bold text-primary">
              {b.serviceId?.title}
            </h3>
            <p className="flex items-center gap-2 text-gray-600 text-sm mt-1">
              <User size={16} /> {b.technicianId?.name}
            </p>
            <p className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={16} />{" "}
              {new Date(b.bookingDate).toLocaleDateString()}
            </p>
            <p className="mt-2 text-sm">
              Status:{" "}
              <span className="px-2 py-0.5 text-xs rounded-full border border-gray-300">
                {b.status}
              </span>
            </p>

            {b.review && (
              <div className="mt-3">
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: b.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="italic text-xs text-gray-600 mt-1">
                  "{b.review}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cancel Modal */}
      {activeModal === "cancel" && (
        <Modal
          title="Cancel Booking?"
          onClose={() => setActiveModal(null)}
          onConfirm={cancelBooking}
          confirmLabel="Yes, Cancel"
          confirmClass="bg-red-600 hover:bg-red-700 text-white"
        >
          Are you sure you want to cancel this booking?
        </Modal>
      )}

      {/* Reschedule Modal */}
      {activeModal === "reschedule" && (
        <Modal
          title="Reschedule Booking"
          onClose={() => setActiveModal(null)}
          onConfirm={rescheduleBooking}
          confirmLabel="Reschedule"
          confirmClass="bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          <input
            type="date"
            className="input input-bordered w-full border border-gray-300 rounded-md p-2"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </Modal>
      )}

      {/* Review Modal */}
      {activeModal === "review" && (
        <Modal
          title="Leave a Review"
          onClose={() => setActiveModal(null)}
          onConfirm={reviewBooking}
          confirmLabel="Submit"
          confirmClass="bg-green-600 hover:bg-green-700 text-white"
        >
          <label className="block mb-2 font-medium text-sm">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            className="input input-bordered w-full mb-4 border border-gray-300 rounded-md p-2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <textarea
            className="textarea textarea-bordered w-full border border-gray-300 rounded-md p-2"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
  onConfirm,
  confirmLabel,
  confirmClass,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-xl w-96 p-6 border border-gray-200">
        <h2 className="text-lg font-bold mb-4 text-primary">{title}</h2>
        {children}
        <div className="mt-6 flex justify-end gap-2">
          <button className="px-4 py-2 rounded-md border" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md ${confirmClass}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
