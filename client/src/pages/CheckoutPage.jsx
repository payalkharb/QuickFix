import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";
import API_URL from "../utils/api";
import axios from "axios";
import {
  Calendar,
  Clock,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import LocationInput from "../components/LocationInput"; // ✅ Import LocationInput

export default function CheckoutPage() {
  const { user } = useAuthStore();
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState(""); // ✅ customer location input
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${serviceId}`);
        const data = await res.json();
        setService(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load service details");
      }
    };
    fetchService();
  }, [serviceId]);

  useEffect(() => {
    if (user?.location) {
      setLocation(user.location); // prefill customer’s saved location
    }
  }, [user]);

  const handlePlaceBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to book a service");
        return;
      }

      const bookingDate = new Date(`${date}T${time}`);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings`,
        `${API_URL}/api/bookings`,
        { serviceId, bookingDate, location }, // ✅ send location also
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Booking placed successfully!");
      setShowPopup(false);
      navigate("/customer/bookings");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Could not place booking");
    }
  };

  if (!service) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-4 relative overflow-auto">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-center mb-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold">
              ✓
            </div>
            <p className="text-sm mt-2 font-medium">Service</p>
          </div>

          <div className="flex-1 h-1 bg-gray-300 mx-2"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-600 text-white font-bold">
              2
            </div>
            <p className="text-sm mt-2 font-medium">Checkout</p>
          </div>

          <div className="flex-1 h-1 bg-gray-300 mx-2"></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-600 font-bold">
              3
            </div>
            <p className="text-sm mt-2 font-medium">Confirmation</p>
          </div>
        </div>

        <div className="card bg-white shadow-xl rounded-2xl w-full p-5 grid grid-cols-1 md:grid-cols-2 gap-5 border border-pink-200">
          {/* LEFT: Service & Booking Form */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold mb-4 text-pink-600">
              Checkout
            </h2>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 p-4 rounded-xl mb-5 shadow-sm">
              <h3 className="font-bold text-lg text-gray-800">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {service.description}
              </p>
              <span className="inline-block mt-2 bg-pink-600 text-white font-semibold px-3 py-1 rounded-full shadow-sm">
                ₹{service.price}
              </span>
            </div>

            <label className="block mb-1 font-semibold text-gray-700">
              <Calendar className="inline w-4 h-4 mr-2 text-pink-500" />
              Select Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full mb-3 border-pink-300 focus:ring focus:ring-pink-200"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="block mb-1 font-semibold text-gray-700">
              <Clock className="inline w-4 h-4 mr-2 text-purple-500" />
              Select Time
            </label>
            <input
              type="time"
              className="input input-bordered w-full mb-3 border-purple-300 focus:ring focus:ring-purple-200"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            {/* ✅ Location Input */}
            <label className="block mb-1 font-semibold text-gray-700">
              <MapPin className="inline w-4 h-4 mr-2 text-red-500" />
              Enter Location
            </label>
            <LocationInput value={location} onChange={setLocation} />

            <div className="mb-5 mt-3">
              <h3 className="font-semibold mb-2 text-gray-700 flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-green-600" />
                Payment Method
              </h3>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium shadow-sm">
                💵 Cash after Service
              </span>
            </div>

            <button
              className={`btn w-full shadow-md transition-all ${
                !date || !time
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              }`}
              onClick={() => setShowPopup(true)}
              disabled={!date || !time}
            >
              Proceed to Book
            </button>
          </div>

          {/* RIGHT: Service Image + Technician */}
          <div className="flex flex-col">
            <div className="h-48 w-full mb-3">
              <img
                src={service.image || "https://via.placeholder.com/400"}
                alt={service.title}
                className="w-full h-full object-cover rounded-xl shadow border border-gray-200"
              />
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 flex-1 shadow border border-purple-200 text-sm">
              <h3 className="font-bold text-lg mb-2 text-purple-700">
                Technician Details
              </h3>
              <p className="mb-1">
                <span className="font-semibold">👤 Name:</span>{" "}
                {service.createdBy?.name || "Not Available"}
              </p>
              <p className="mb-1 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green-600" />
                {service.createdBy?.phone || "Not Available"}
              </p>
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-red-500" />
                {service.createdBy?.location || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Final Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-80 shadow-2xl border border-pink-200">
            <h3 className="text-lg font-bold mb-3 text-pink-600">
              Confirm Booking
            </h3>
            <p>
              <strong>Service:</strong> {service.title}
            </p>
            <p>
              <strong>Date:</strong> {date}
            </p>
            <p>
              <strong>Time:</strong> {time}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {location || user?.location || "Not Provided"}
            </p>

            <p>
              <strong>Payment:</strong> Cash after Service
            </p>

            <div className="mt-4 flex gap-2">
              <button
                className="btn bg-green-500 hover:bg-green-600 text-white flex-1 shadow"
                onClick={handlePlaceBooking}
              >
                Place Booking
              </button>
              <button
                className="btn bg-gray-200 hover:bg-gray-300 flex-1"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
