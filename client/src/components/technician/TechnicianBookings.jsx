// import React, { useState } from "react";
// import api from "../../api/api";
// import useAuthStore from "../../store/authStore";
// import {
//   Calendar,
//   User,
//   Phone,
//   XCircle,
//   Clock,
//   DollarSign,
//   Tag,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// export default function TechnicianBookings({ bookings = [], fetchBookings }) {
//   const { token } = useAuthStore();
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const updateStatus = async (id, status) => {
//     try {
//       await api.put(
//         `/api/bookings/status/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(`Booking marked as ${status}`);
//       setSelectedBooking(null);
//       fetchBookings && fetchBookings();
//     } catch (error) {
//       console.error(error);
//       toast.error("Action failed");
//     }
//   };

//   if (!bookings.length)
//     return <p className="text-center py-4">No bookings available.</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Bookings</h2>
//       <div className="grid gap-4 md:grid-cols-2">
//         {bookings.map((booking) => {
//           const status = (booking.status || "").toLowerCase();
//           const statusLabel = status
//             ? status.charAt(0).toUpperCase() + status.slice(1)
//             : "Unknown";

//           return (
//             <div
//               key={booking._id}
//               className="p-4 border rounded-lg shadow-md bg-white flex flex-col"
//             >
//               <h3 className="text-lg font-semibold mb-2">
//                 {booking?.serviceId?.title || "Service"}
//               </h3>

//               {/* Date + Time (from bookingDate) */}
//               <p className="flex items-center gap-2 text-sm text-gray-700">
//                 <Calendar size={16} />{" "}
//                 {new Date(booking.bookingDate).toLocaleDateString()}
//               </p>
//               <p className="flex items-center gap-2 text-sm text-gray-700">
//                 <Clock size={16} />
//                 {new Date(booking.bookingDate).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>

//               {/* Customer Info */}
//               <p className="flex items-center gap-2 text-sm text-gray-700">
//                 <User size={16} /> Customer: {booking.customerId?.name || "N/A"}
//               </p>
//               <p className="flex items-center gap-2 text-sm text-gray-700">
//                 <Phone size={16} /> {booking.customerId?.phone || "N/A"}
//               </p>

//               {/* Price & Type (type mapped from service.category) */}
//               <p className="flex items-center gap-2 text-sm text-gray-700">
//                 <DollarSign size={16} /> Price: ₹
//                 {typeof booking?.serviceId?.price === "number"
//                   ? booking.serviceId.price
//                   : "N/A"}
//               </p>
//               <p className="flex items-center gap-2 text-sm text-gray-700">
//                 <Tag size={16} /> Type: {booking?.serviceId?.category || "N/A"}
//               </p>

//               {/* Status badge */}
//               <p
//                 className={`mt-2 inline-block px-3 py-1 text-xs rounded-full w-fit ${
//                   status === "pending"
//                     ? "bg-yellow-200 text-yellow-800"
//                     : status === "confirmed"
//                     ? "bg-green-200 text-green-800"
//                     : status === "completed"
//                     ? "bg-blue-200 text-blue-800"
//                     : status === "cancelled"
//                     ? "bg-red-200 text-red-800"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {statusLabel}
//               </p>

//               {/* Actions */}
//               {status === "pending" && (
//                 <div className="flex gap-2 mt-3">
//                   <button
//                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                     onClick={() => updateStatus(booking._id, "confirmed")}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     onClick={() => updateStatus(booking._id, "cancelled")}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Booking details modal */}
//       {selectedBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-96 relative">
//             <button
//               className="absolute top-2 right-2"
//               onClick={() => setSelectedBooking(null)}
//             >
//               <XCircle size={20} />
//             </button>
//             <h3 className="text-lg font-semibold mb-4">Booking Details</h3>

//             <p>
//               <strong>Service:</strong>{" "}
//               {selectedBooking?.serviceId?.title || "Service"}
//             </p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(selectedBooking.bookingDate).toLocaleDateString()}
//             </p>
//             <p>
//               <strong>Time:</strong>{" "}
//               {new Date(selectedBooking.bookingDate).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               })}
//             </p>
//             <p>
//               <strong>Customer:</strong> {selectedBooking.customerId?.name}
//             </p>
//             <p>
//               <strong>Phone:</strong> {selectedBooking.customerId?.phone}
//             </p>
//             <p>
//               <strong>Price:</strong> ₹
//               {typeof selectedBooking?.serviceId?.price === "number"
//                 ? selectedBooking.serviceId.price
//                 : "N/A"}
//             </p>
//             <p>
//               <strong>Type:</strong>{" "}
//               {selectedBooking?.serviceId?.category || "N/A"}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import api from "../../api/api";
import useAuthStore from "../../store/authStore";
import {
  Calendar,
  User,
  Phone,
  XCircle,
  Clock,
  DollarSign,
  Tag,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function TechnicianBookings({ bookings = [], fetchBookings }) {
  const { token } = useAuthStore();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/api/bookings/status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(
        status === "completion_requested"
          ? "Marked as complete (waiting for customer confirmation)"
          : `Booking marked as ${status}`
      );
      setSelectedBooking(null);
      fetchBookings && fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error("Action failed");
    }
  };

  if (!bookings.length)
    return <p className="text-center py-4">No bookings available.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {bookings.map((booking) => {
          const status = (booking.status || "").toLowerCase();
          const statusLabel = status
            ? status.charAt(0).toUpperCase() + status.slice(1)
            : "Unknown";

          return (
            <div
              key={booking._id}
              className="p-4 border rounded-lg shadow-md bg-white flex flex-col"
            >
              <h3 className="text-lg font-semibold mb-2">
                {booking?.serviceId?.title || "Service"}
              </h3>

              {/* Date + Time (from bookingDate) */}
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} />{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} />
                {new Date(booking.bookingDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* Customer Info */}
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <User size={16} /> Customer: {booking.customerId?.name || "N/A"}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <Phone size={16} /> {booking.customerId?.phone || "N/A"}
              </p>

              {/* Price & Type (type mapped from service.category) */}
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <DollarSign size={16} /> Price: ₹
                {typeof booking?.serviceId?.price === "number"
                  ? booking.serviceId.price
                  : "N/A"}
              </p>
              <p className="flex items-center gap-2 text-sm text-gray-700">
                <Tag size={16} /> Type: {booking?.serviceId?.category || "N/A"}
              </p>

              {/* Status badge */}
              <p
                className={`mt-2 inline-block px-3 py-1 text-xs rounded-full w-fit ${
                  status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : status === "confirmed"
                    ? "bg-green-200 text-green-800"
                    : status === "completion_requested"
                    ? "bg-purple-200 text-purple-800"
                    : status === "completed"
                    ? "bg-blue-200 text-blue-800"
                    : status === "cancelled"
                    ? "bg-red-200 text-red-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {statusLabel}
              </p>

              {/* Actions */}
              {status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => updateStatus(booking._id, "confirmed")}
                  >
                    Accept
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => updateStatus(booking._id, "cancelled")}
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* ✅ Mark as Complete button for confirmed bookings */}
              {status === "confirmed" && (
                <div className="mt-3">
                  <button
                    className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm hover:bg-green-200"
                    onClick={() =>
                      updateStatus(booking._id, "completion_requested")
                    }
                  >
                    Mark as Complete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Booking details modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => setSelectedBooking(null)}
            >
              <XCircle size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>

            <p>
              <strong>Service:</strong>{" "}
              {selectedBooking?.serviceId?.title || "Service"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedBooking.bookingDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(selectedBooking.bookingDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>
              <strong>Customer:</strong> {selectedBooking.customerId?.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedBooking.customerId?.phone}
            </p>
            <p>
              <strong>Price:</strong> ₹
              {typeof selectedBooking?.serviceId?.price === "number"
                ? selectedBooking.serviceId.price
                : "N/A"}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {selectedBooking?.serviceId?.category || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
