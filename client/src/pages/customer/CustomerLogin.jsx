import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore(); // ✅ move here

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOTP = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/send-otp`,
        {
          email,
          role: "customer",
        }
      );

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
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          email,
          role: "customer",
          otp,
        }
      );

      if (res.data.success) {
        login(res.data.token, "customer", res.data.user); // ✅ Zustand update
        alert("Login successful!");
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
    // <div className="min-h-screen flex items-center justify-center bg-base-200">
    //   <div className="card w-full max-w-md bg-base-100 shadow-lg p-8">
    //     <h2 className="text-2xl font-bold text-center mb-6">Customer Login</h2>

    //     {!otpSent ? (
    //       <>
    //         <div className="form-control mb-4">
    //           <label className="label">Email</label>
    //           <input
    //             type="email"
    //             className="input input-bordered"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />
    //         </div>

    //         <button className="btn btn-primary mt-6" onClick={handleSendOTP}>
    //           Send OTP
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         <div className="form-control mb-4">
    //           <label className="label">Enter OTP</label>
    //           <input
    //             type="text"
    //             className="input input-bordered"
    //             value={otp}
    //             onChange={(e) => setOtp(e.target.value)}
    //           />
    //         </div>

    //         <button className="btn btn-success mt-2" onClick={handleVerifyOTP}>
    //           Verify & Login
    //         </button>
    //       </>
    //     )}
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel */}
        <div className="bg-primary text-white flex flex-col justify-center p-10 space-y-4">
          <h2 className="text-3xl font-bold">Welcome Back, Customer</h2>
          <p>Login to book services easily and explore all that we offer!</p>
          <button className="btn btn-outline text-white border-white w-fit">
            Know More
          </button>
        </div>

        {/* Right Panel */}
        <div className="p-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Customer Login
          </h2>

          {!otpSent ? (
            <>
              <div className="form-control mb-4">
                <label className="label mb-1">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

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
                <label className="label mb-1">
                  <span className="label-text font-medium">OTP Code</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the 6-digit OTP"
                  className="input input-bordered"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <button
                className="btn btn-success w-full mt-2"
                onClick={handleVerifyOTP}
              >
                Verify & Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
