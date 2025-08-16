// // src/pages/technician/TechnicianDashboard.jsx
// import api from "../../api/api";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../../store/authStore";
// import TechnicianNavbar from "../../components/technician/TechnicianNavbar";
// import TechnicianWelcome from "../../components/technician/TechnicianWelcome";
// import TechnicianStats from "../../components/technician/TechnicianStats";
// import TechnicianServiceCard from "../../components/services/TechnicianServiceCard";
// import TechnicianServiceForm from "../../components/services/TechnicianServiceForm";

// export default function TechnicianDashboard() {
//   const { token } = useAuthStore();
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [formOpen, setFormOpen] = useState(false);
//   const [editService, setEditService] = useState(null);

//   // ✅ Fetch bookings
//   const fetchBookings = async () => {
//     try {
//       const res = await api.get("/api/technician/bookings", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.status === 200) {
//         console.log("Bookings API response:", res.data);
//         setBookings(
//           Array.isArray(res.data) ? res.data : res.data.bookings || []
//         );
//       }
//     } catch (e) {
//       console.error("❌ Error fetching bookings:", e);
//     }
//   };

//   // ✅ Fetch services created by this technician
//   const fetchServices = async () => {
//     try {
//       const res = await api.get("/api/technician/services", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.status === 200) {
//         console.log("Services API response:", res.data);
//         // ensure it's always an array
//         setServices(
//           Array.isArray(res.data) ? res.data : res.data.services || []
//         );
//       }
//     } catch (e) {
//       console.error("❌ Fetch services failed:", e);
//     }
//   };

//   useEffect(() => {
//     const fetchAll = async () => {
//       await fetchBookings();
//       await fetchServices();
//       setLoading(false);
//     };
//     fetchAll();
//   }, []);

//   const handleStatusChange = async (bid, newStatus) => {
//     const res = await fetch(`/api/technician/booking/${bid}/status`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status: newStatus }),
//     });
//     if (res.ok) fetchBookings();
//     else console.error("❌ Update failed", res.status);
//   };

//   // CRUD handlers for services
//   const openForm = (svc = null) => {
//     setEditService(svc);
//     setFormOpen(true);
//   };
//   const closeForm = () => {
//     setFormOpen(false);
//     setEditService(null);
//   };

//   const submitService = async (formData) => {
//     try {
//       let res;
//       if (editService) {
//         res = await api.put(
//           `/api/technician/services/${editService._id}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//       } else {
//         res = await api.post("/api/technician/services", formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       }

//       console.log("✅ Service saved:", res.data);
//       fetchServices();
//       closeForm();
//     } catch (err) {
//       console.error(
//         "❌ Service save failed:",
//         err.response?.data || err.message
//       );
//     }
//   };

//   const deleteService = async (id) => {
//     try {
//       const res = await api.delete(`/api/technician/services/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("✅ Deleted:", res.data);
//       setServices((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error(
//         "❌ Error deleting service:",
//         err.response?.data || err.message
//       );
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen bg-base-200 p-6">
//       <TechnicianNavbar />
//       <TechnicianWelcome />
//       <TechnicianStats total={0} count={bookings.length} />

//       {/* Services Section */}
//       <section className="mt-8 space-y-4">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Your Services</h2>
//           <button onClick={() => openForm()} className="btn btn-primary btn-sm">
//             + Add Service
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           {services.length > 0 ? (
//             services.map((s) => (
//               <TechnicianServiceCard
//                 key={s._id}
//                 service={s}
//                 onEdit={openForm}
//                 onDelete={deleteService}
//               />
//             ))
//           ) : (
//             <p>No services yet.</p>
//           )}
//         </div>
//       </section>

//       {/* Service Form Modal */}
//       {formOpen && (
//         <TechnicianServiceForm
//           initial={editService || {}}
//           onSubmit={submitService}
//           onCancel={closeForm}
//         />
//       )}
//     </div>
//   );
// }

// *************************************************
// src/pages/technician/TechnicianDashboard.jsx
import api from "../../api/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import TechnicianNavbar from "../../components/technician/TechnicianNavbar";
import TechnicianWelcome from "../../components/technician/TechnicianWelcome";
import TechnicianStats from "../../components/technician/TechnicianStats";
import TechnicianServiceCard from "../../components/services/TechnicianServiceCard";
import TechnicianServiceForm from "../../components/services/TechnicianServiceForm";

export default function TechnicianDashboard() {
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [saving, setSaving] = useState(false); // loader state

  // ✅ Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await api.get("/api/technician/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        console.log("Bookings API response:", res.data);
        setBookings(
          Array.isArray(res.data) ? res.data : res.data.bookings || []
        );
      }
    } catch (e) {
      console.error("❌ Error fetching bookings:", e);
    }
  };

  // ✅ Fetch services created by this technician
  const fetchServices = async () => {
    try {
      const res = await api.get("/api/technician/services", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        console.log("Services API response:", res.data);
        setServices(
          Array.isArray(res.data) ? res.data : res.data.services || []
        );
      }
    } catch (e) {
      console.error("❌ Fetch services failed:", e);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await fetchBookings();
      await fetchServices();
      setLoading(false);
    };
    fetchAll();
  }, []);

  const handleStatusChange = async (bid, newStatus) => {
    const res = await fetch(`/api/technician/booking/${bid}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchBookings();
    else console.error("❌ Update failed", res.status);
  };

  // CRUD handlers for services
  const openForm = (svc = null) => {
    setEditService(svc);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditService(null);
  };

  const submitService = async (formData) => {
    try {
      setSaving(true); // start loader
      let res;
      if (editService) {
        res = await api.put(
          `/api/technician/services/${editService._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        res = await api.post("/api/technician/services", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      console.log("✅ Service saved:", res.data);
      fetchServices();
      closeForm();
    } catch (err) {
      console.error(
        "❌ Service save failed:",
        err.response?.data || err.message
      );
    } finally {
      setSaving(false); // stop loader
    }
  };

  const deleteService = async (id) => {
    try {
      const res = await api.delete(`/api/technician/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Deleted:", res.data);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(
        "❌ Error deleting service:",
        err.response?.data || err.message
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <TechnicianNavbar />
      <TechnicianWelcome />
      <TechnicianStats total={0} count={bookings.length} />

      {/* Services Section */}
      <section className="mt-8 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Services</h2>
          <button onClick={() => openForm()} className="btn btn-primary btn-sm">
            + Add Service
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {services.length > 0 ? (
            services.map((s) => (
              <TechnicianServiceCard
                key={s._id}
                service={s}
                onEdit={openForm}
                onDelete={deleteService}
              />
            ))
          ) : (
            <p>No services yet.</p>
          )}
        </div>
      </section>

      {/* Service Form Modal */}
      {formOpen && (
        <TechnicianServiceForm
          initial={editService || {}}
          onSubmit={submitService}
          onCancel={closeForm}
          saving={saving} // pass loader flag
        />
      )}
    </div>
  );
}
