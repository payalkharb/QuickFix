// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import LocationInput from "../../components/LocationInput";
// import useAuthStore from "../../store/authStore";
// import { toast } from "react-hot-toast";

// export default function TechnicianSignup() {
//   const navigate = useNavigate();
//   const { login } = useAuthStore();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//     serviceType: "",
//   });

//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleLocationChange = (loc) => {
//     setFormData((prev) => ({ ...prev, location: loc }));
//   };

//   const handleSendOTP = async () => {
//     const { email, phone, location } = formData;

//     if (!email || !phone || !location) {
//       toast.error("Please fill all required fields including location");
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
//         email,
//         phone,
//         role: "technician",
//       });

//       if (res.data.success) {
//         toast.success("OTP sent to your email!");
//         setOtpSent(true);
//       } else {
//         toast.error("OTP Send Failed: " + res.data.message);
//       }
//     } catch (err) {
//       toast.error("Error sending OTP");
//       console.error(err);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const { email, name, phone, location, serviceType } = formData;

//     if (!otp || !location) {
//       toast.error("OTP and Location are required");
//       return;
//     }

//     try {
//       const res = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
//         email,
//         otp,
//         name,
//         phone,
//         location,
//         serviceType,
//         role: "technician",
//       });

//       if (res.data.token) {
//         toast.success("OTP Verified Successfully!");
//         localStorage.setItem("token", res.data.token);
//         login(res.data.token, "technician", res.data.user);

//         navigate("/technician/dashboard");
//       } else {
//         toast.error("Verification Failed: No token received");
//       }
//     } catch (err) {
//       toast.error("Verification Failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
//       <div className="card w-full max-w-md bg-white shadow-xl p-8">
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Technician Signup
//         </h2>

//         {!otpSent && (
//           <>
//             <div className="form-control mb-4">
//               <label className="label">Name</label>
//               <input
//                 name="name"
//                 type="text"
//                 placeholder="Enter your name"
//                 className="input input-bordered"
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-control mb-4">
//               <label className="label">Email</label>
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 className="input input-bordered"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-control mb-4">
//               <label className="label">Phone</label>
//               <input
//                 name="phone"
//                 type="tel"
//                 placeholder="Enter your phone"
//                 className="input input-bordered"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-control mb-4">
//               <label className="label">Location</label>
//               <LocationInput onChange={handleLocationChange} />
//             </div>

//             <div className="form-control mb-4">
//               <label className="label">Service Type</label>
//               <select
//                 name="serviceType"
//                 className="select select-bordered"
//                 value={formData.serviceType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select service</option>
//                 <option value="AC Service">AC Service</option>
//                 <option value="Salon">Salon</option>
//                 <option value="Massage">Massage</option>
//                 <option value="Plumber">Plumber</option>
//                 <option value="Carpenter">Carpenter</option>
//                 <option value="Electrician">Electrician</option>
//               </select>
//             </div>

//             <button className="btn btn-primary mt-4" onClick={handleSendOTP}>
//               Send OTP
//             </button>
//           </>
//         )}

//         {otpSent && (
//           <>
//             <div className="form-control mb-4">
//               <label className="label">Enter OTP</label>
//               <input
//                 type="text"
//                 placeholder="Enter the OTP received"
//                 className="input input-bordered"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </div>

//             <button className="btn btn-success mt-2" onClick={handleVerifyOTP}>
//               Verify & Signup
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LocationInput from "../../components/LocationInput";
import useAuthStore from "../../store/authStore";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function TechnicianSignup() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    serviceType: "",
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
    const { email, phone, location } = formData;

    if (!email || !phone || !location) {
      toast.error("Please fill all required fields including location");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/send-otp`, {
        email,
        phone,
        role: "technician",
      });

      if (res.data.success) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
      } else {
        toast.error("OTP Send Failed: " + res.data.message);
      }
    } catch (err) {
      toast.error("Error sending OTP");
      console.error(err);
    }
  };

  const handleVerifyOTP = async () => {
    const { email, name, phone, location, serviceType } = formData;

    if (!otp || !location) {
      toast.error("OTP and Location are required");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/verify-otp`, {
        email,
        otp,
        name,
        phone,
        location,
        serviceType,
        role: "technician",
      });

      if (res.data.token) {
        toast.success("OTP Verified Successfully!");
        localStorage.setItem("token", res.data.token);
        login(res.data.token, "technician", res.data.user);
        navigate("/technician/dashboard");
      } else {
        toast.error("Verification Failed: No token received");
      }
    } catch (err) {
      toast.error("Verification Failed");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left side info box */}
        <div className="bg-[#4F46E5] text-white flex flex-col justify-center items-start p-10 space-y-4">
          <h2 className="text-3xl font-bold">Join Us as a Technician</h2>
          <p>
            Start receiving service requests from verified customers in your
            area!
          </p>
          <button className="btn btn-outline text-white border-white w-fit">
            Know More
          </button>
        </div>

        {/* Right side form */}
        <div className="p-10 bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            Technician Signup
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

              <label className="label" htmlFor="location">
                <span className="label-text">Location</span>
              </label>
              <LocationInput id="location" onChange={handleLocationChange} />

              <div className="form-control mb-4 mt-4">
                <label className="label" htmlFor="serviceType">
                  <span className="label-text">Service Type</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="select select-bordered"
                  value={formData.serviceType}
                  onChange={handleChange}
                >
                  <option value="">Select service</option>
                  <option value="AC Service">AC Service</option>
                  <option value="Salon">Salon</option>
                  <option value="Massage">Massage</option>
                  <option value="Plumber">Plumber</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Electrician">Electrician</option>
                </select>
              </div>

              <button
                className="btn w-full mt-6 bg-[#4F46E5] text-white hover:bg-[#4338CA]"
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
                className="btn w-full mt-2 bg-green-500 text-white hover:bg-green-600"
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
