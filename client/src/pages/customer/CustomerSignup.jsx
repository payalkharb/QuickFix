import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationInput from "../../components/LocationInput";
import useAuthStore from "../../store/authStore";

export default function CustomerSignup() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLocationChange = (loc) => {
    setFormData((prev) => ({ ...prev, location: loc }));
  };

  const handleSendOTP = async () => {
    try {
      const { email, phone } = formData;
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", {
        email,
        phone,
        role: "customer",
      });

      if (res.data.success) {
        setOtpSent(true);
        alert("OTP sent to email!");
      } else {
        alert(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          ...formData,
          role: "customer",
          otp,
        }
      );

      if (res.data.success) {
        alert("Signup successful!");
        login(res.data.token, "customer", res.data.user);
        navigate("/customer/dashboard");
      } else {
        alert(res.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-primary text-white flex flex-col justify-center p-10 space-y-4">
          <h2 className="text-3xl font-bold">Join Us as a Customer</h2>
          <p>
            Sign up to get access to trusted professionals at your doorstep!
          </p>
          <button className="btn btn-outline text-white border-white w-fit">
            Know More
          </button>
        </div>

        <div className="p-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Customer Signup
          </h2>

          {!otpSent ? (
            <>
              <div className="form-control mb-4">
                <label className="label" htmlFor="name">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input input-bordered"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                />
              </div>

              <div className="form-control mb-4">
                <label className="label" htmlFor="phone">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="input input-bordered"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                />
              </div>

              <label className="label" htmlFor="loc">
                <span className="label-text">Location</span>
              </label>
              <LocationInput id="loc" onChange={handleLocationChange} />

              <button
                className="btn btn-primary w-full mt-6"
                onClick={handleSendOTP}
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div className="form-control mb-4">
                <label className="label" htmlFor="otp">
                  <span className="label-text">Enter OTP</span>
                </label>
                <input
                  id="otp"
                  type="text"
                  className="input input-bordered"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP sent to your email"
                />
              </div>

              <button
                className="btn btn-success w-full mt-2"
                onClick={handleVerifyOTP}
              >
                Verify & Signup
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
