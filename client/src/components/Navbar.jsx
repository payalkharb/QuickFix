import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, X, LocateFixed } from "lucide-react";
import toast from "react-hot-toast";
import LocationInput from "../components/LocationInput";
import logoutUser from "../utils/logout";
import useServiceFilterStore from "../store/serviceFilterStore.js";

const dummyServices = [
  {
    name: "Cleaning",
    subservices: ["Home Cleaning", "Office Cleaning", "Deep Cleaning"],
  },
  {
    name: "Electrical",
    subservices: ["Fan Installation", "Switchboard Repair", "Wiring"],
  },
  {
    name: "Plumbing",
    subservices: ["Tap Fixing", "Pipe Leakage", "Bathroom Fittings"],
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [showLocationPanel, setShowLocationPanel] = useState(false);
  const { setSelectedSubService } = useServiceFilterStore();

  const handleLogout = () => {
    logoutUser(navigate); // ✅ clean logout for customer
  };

  const handleSubServiceClick = (sub) => {
    if (token && role === "customer") {
      setSelectedSubService(sub);
      document.getElementById("service-drawer").checked = false;
    } else {
      toast.error("Please Register or Login first.");
    }
  };

  return (
    <div className="z-50 transition-all duration-300 relative">
      <input id="service-drawer" type="checkbox" className="drawer-toggle" />

      {/* Navbar */}
      <div className="drawer-content">
        <div className="navbar bg-base-100 shadow-md px-6 py-2 fixed top-0 w-full z-50">
          <div className="flex-1">
            <Link to="/" className="text-xl font-bold text-primary">
              ABC Company
            </Link>
          </div>

          <div className="navbar-end gap-4 items-center">
            {/* Desktop only: Location + Links */}
            <div className="hidden lg:flex items-center gap-4">
              <LocationInput />
            </div>

            {/* Location Icon for Mobile */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowLocationPanel(true)}
                className="btn btn-ghost btn-circle"
              >
                <LocateFixed className="w-5 h-5" />
              </button>
            </div>

            {/* Auth + Profile */}
            {token ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <User className="w-5 h-5" />
                </div>
                {/* <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40 z-[100]">
                  {role === "customer" && (
                    <li>
                      <Link
                        to="/customer-dashboard"
                        className="font-semibold text-primary"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {role === "technician" && (
                    <li>
                      <Link
                        to="/technician-dashboard"
                        className="font-semibold text-primary"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul> */}
                <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40 z-[100]">
                  {role === "customer" && (
                    <>
                      <li>
                        <Link
                          to="/customer-dashboard"
                          className="font-semibold text-primary"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/customer/bookings"
                          className="font-semibold text-primary"
                        >
                          My Bookings
                        </Link>
                      </li>
                    </>
                  )}
                  {role === "technician" && (
                    <li>
                      <Link
                        to="/technician-dashboard"
                        className="font-semibold text-primary"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/customer" className="btn btn-primary btn-sm">
                Book Service
              </Link>
            )}

            {/* Drawer toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary hidden lg:inline">
                All Services
              </span>
              <label
                htmlFor="service-drawer"
                className="btn btn-ghost btn-circle drawer-button"
                title="All Services"
              >
                <Menu className="w-5 h-5" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Side Content */}
      <div className="drawer-side z-50 transition-transform duration-300">
        <label htmlFor="service-drawer" className="drawer-overlay"></label>
        <div className="menu p-6 w-80 min-h-full bg-gradient-to-b from-base-200 to-base-100 text-base-content rounded-tr-2xl shadow-2xl flex flex-col gap-5 relative">
          {/* Close button */}
          <button
            className="btn-sm btn-ghost absolute top-3 right-3"
            onClick={() =>
              (document.getElementById("service-drawer").checked = false)
            }
          >
            <X className="w-5 h-5" />
          </button>

          {/* Greeting Section */}
          {token && (
            <div className="flex items-center gap-3 border-b pb-4 pt-2">
              <div className="bg-primary text-white p-2 rounded-full">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Hi again, let's get something fixed today!
                </p>
              </div>
            </div>
          )}

          {/* LocationInput hidden on small screens */}
          <div className="hidden lg:flex flex-col gap-2">
            <h2 className="text-sm font-bold text-primary">Your Location</h2>
            <div className="w-full">
              <LocationInput />
            </div>
          </div>

          {/* About / Contact */}
          <div className="flex flex-col gap-2"></div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-primary">Services</h2>
            {dummyServices.map((service) => (
              <div key={service.name} className="mb-4">
                <details open className="bg-base-100 rounded-lg shadow-sm">
                  <summary className="cursor-pointer px-4 py-2 font-semibold">
                    {service.name}
                  </summary>
                  <ul className="px-4 pb-2">
                    {service.subservices.map((sub) => (
                      <li key={sub}>
                        <button
                          onClick={() => handleSubServiceClick(sub)}
                          className="w-full text-left px-2 py-1 rounded hover:bg-primary hover:text-white transition"
                        >
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            ))}
          </div>
          {token ? (
            <button
              className="btn btn-sm btn-error text-white w-full text-left"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/customer" className="btn btn-primary btn-sm w-full">
              Login / Signup
            </Link>
          )}
        </div>
      </div>

      {/* Slide-over Location Input for mobile */}
      {showLocationPanel && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-end">
          <div className="w-[90%] sm:w-[400px] h-full bg-base-100 shadow-xl p-6 relative">
            <button
              className="absolute top-4 right-4 btn btn-sm btn-ghost"
              onClick={() => setShowLocationPanel(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4 text-primary">
              Set Location
            </h2>
            <LocationInput />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
