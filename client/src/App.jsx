// src/App.jsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useAuthStore from "./store/authStore";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import TechnicianOptions from "./pages/technician/TechnicianOptions";
import CustomerOptions from "./pages/customer/CustomerOptions";
import TechnicianSignup from "./pages/technician/TechnicianSignup";
import CustomerSignup from "./pages/customer/CustomerSignup";
import TechnicianLogin from "./pages/technician/TechnicianLogin";
import CustomerLogin from "./pages/customer/CustomerLogin";
import PrivateRoute from "./components/PrivateRoute";
import TechnicianDashboard from "./pages/technician/TechnicianDashboard";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import AutoLoginRedirector from "./components/AutoLoginRedirector";
import CheckoutPage from "./pages/CheckoutPage";
import MyBookings from "./pages/MyBookings";

function App() {
  const { restoreAuth } = useAuthStore();

  useEffect(() => {
    restoreAuth();
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AutoLoginRedirector />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customer/bookings" element={<MyBookings />} />

        {/* Technician Routes */}
        <Route path="/technician" element={<TechnicianOptions />} />
        <Route path="/technician/signup" element={<TechnicianSignup />} />
        <Route path="/technician/login" element={<TechnicianLogin />} />
        <Route path="/technician" element={<PrivateRoute role="technician" />}>
          <Route path="dashboard" element={<TechnicianDashboard />} />
        </Route>

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerOptions />} />
        <Route path="/customer/signup" element={<CustomerSignup />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer" element={<PrivateRoute role="customer" />}>
          <Route path="dashboard" element={<CustomerDashboard />} />
        </Route>
        <Route path="/book/:serviceId" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
