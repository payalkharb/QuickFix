import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const TechnicianNavbar = () => {
  const { logout } = useAuthStore(); // get logout from store
  const navigate = useNavigate(); // get navigate function

  const handleLogout = () => {
    logout(); // call logout
    navigate("/", { replace: true }); // redirect
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-extrabold text-primary tracking-wide">
          ABC company
        </span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center space-x-5">
        {/* Search Bar */}
        <div className="ml-6 w-48">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
          />
        </div>

        <Link
          to="/technician/bookings"
          className="text-gray-700 hover:text-primary font-medium transition-colors"
        >
          Bookings
        </Link>

        {/* Profile / Logout */}
        <div className="flex items-center space-x-3">
          <Link
            to="/technician/profile"
            className="text-gray-700 hover:text-primary font-medium transition-colors"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout} // use handleLogout here
            className="btn btn-primary btn-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TechnicianNavbar;
