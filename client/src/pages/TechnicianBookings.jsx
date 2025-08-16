import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";

const BASE_URL = "http://localhost:5000/api";

export default function TechnicianBookings() {
  const { token } = useAuthStore();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/bookings/technician`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch technician bookings");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/bookings/status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Booking marked as ${status}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Status update failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Assigned Bookings</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {bookings.map((b) => (
          <div key={b._id} className="card bg-base-100 p-4 shadow">
            <h3 className="font-semibold">{b.serviceId?.name}</h3>
            <p>Customer: {b.customerId?.name}</p>
            <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
            <p>Status: {b.status}</p>

            <div className="mt-2 flex gap-2">
              <button
                className="btn btn-sm btn-info"
                onClick={() => updateStatus(b._id, "confirmed")}
              >
                Confirm
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => updateStatus(b._id, "completed")}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
