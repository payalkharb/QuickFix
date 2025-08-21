import React from "react";
import {
  FaBook,
  FaTools,
  FaMoneyBillWave,
  FaCheckSquare,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ activeSection, setActiveSection, handleLogout }) => {
  return (
    <aside className="w-64 bg-primary text-white p-6 fixed top-0 left-0 h-full flex flex-col">
      {/* Company Name */}
      <h1 className="text-xl font-bold mb-8">ABC COMPANY</h1>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-6">
          <li
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md ${
              activeSection === "bookings"
                ? "bg-white text-primary font-bold"
                : ""
            }`}
            onClick={() => setActiveSection("bookings")}
          >
            <FaBook /> Bookings
          </li>

          <li
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md ${
              activeSection === "services"
                ? "bg-white text-primary font-bold"
                : ""
            }`}
            onClick={() => setActiveSection("services")}
          >
            <FaTools /> My Services
          </li>

          <li
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md ${
              activeSection === "earnings"
                ? "bg-white text-primary font-bold"
                : ""
            }`}
            onClick={() => setActiveSection("earnings")}
          >
            <FaMoneyBillWave /> Total Earnings
          </li>

          {/* <li
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md ${
              activeSection === "completed"
                ? "bg-white text-primary font-bold"
                : ""
            }`}
            onClick={() => setActiveSection("completed")}
          >
            <FaCheckSquare /> Completed Jobs
          </li> */}

          {/* <li
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md ${
              activeSection === "profile"
                ? "bg-white text-primary font-bold"
                : ""
            }`}
            onClick={() => setActiveSection("profile")}
          >
            <FaUser /> Update Profile
          </li> */}
        </ul>
      </div>

      {/* Logout */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="btn bg-yellow-500 text-primary font-semibold flex items-center gap-2 hover:bg-yellow-400 w-full"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
