// import { useEffect, useState } from "react";
// import useLocationStore from "../store/locationStore";
// import useServiceFilterStore from "../store/serviceFilterStore";
// import { Slider } from "@mui/material";
// import { Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const ServicesDisplay = () => {
//   const { location } = useLocationStore();
//   const { selectedSubService, filters, setFilters } = useServiceFilterStore();
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const queryParams = new URLSearchParams();

//         if (selectedSubService)
//           queryParams.append("category", selectedSubService);
//         if (filters.priceRange.length === 2) {
//           queryParams.append("minPrice", filters.priceRange[0]);
//           queryParams.append("maxPrice", filters.priceRange[1]);
//         }

//         const res = await fetch(`/api/services?${queryParams.toString()}`);
//         const contentType = res.headers.get("content-type");

//         if (!contentType || !contentType.includes("application/json")) {
//           const text = await res.text();
//           console.error("Expected JSON but got:", text);
//           setLoading(false);
//           return;
//         }

//         const data = await res.json();
//         if (Array.isArray(data)) setServices(data);
//         else console.error("Expected array but got:", data);
//       } catch (err) {
//         console.error("Error fetching services:", err);
//         toast.error("Failed to fetch services");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, [selectedSubService, filters]);

//   return (
//     <section className="py-10 px-4 lg:px-16 bg-base-100">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-primary mb-4">
//           Services Available Near You
//         </h2>

//         {/* Filters */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-base-200 p-4 rounded-xl shadow-sm">
//           <div>
//             <label className="font-semibold">Price Range (₹)</label>
//             <Slider
//               value={filters.priceRange}
//               onChange={(_, newValue) => setFilters({ priceRange: newValue })}
//               min={0}
//               max={5000}
//               step={100}
//               valueLabelDisplay="auto"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Availability</label>
//             <select
//               className="select select-bordered w-full mt-1"
//               value={filters.availability}
//               onChange={(e) => setFilters({ availability: e.target.value })}
//             >
//               <option value="any">Any</option>
//               <option value="today">Available Today</option>
//               <option value="tomorrow">Available Tomorrow</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Services List */}
//       {loading ? (
//         <div className="flex justify-center py-10">
//           <Loader2 className="w-6 h-6 animate-spin text-primary" />
//         </div>
//       ) : services.length === 0 ? (
//         <p className="text-center text-gray-500">No services found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {services.map((service) => (
//             <div
//               key={service._id}
//               className="card bg-base-100 shadow-md hover:shadow-lg transition"
//             >
//               {service.image && (
//                 <figure>
//                   <img
//                     src={service.image}
//                     alt={service.title}
//                     className="w-full h-48 object-cover rounded-t-lg"
//                   />
//                 </figure>
//               )}
//               <div className="card-body">
//                 <h3 className="card-title text-primary">{service.title}</h3>
//                 <p className="text-sm text-gray-600">{service.description}</p>
//                 <p className="font-semibold mt-2">₹{service.price}</p>
//                 <div className="card-actions mt-4">
//                   <button
//                     onClick={() => navigate(`/book/${service._id}`)}
//                     className="btn btn-primary btn-sm w-full"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default ServicesDisplay;

// _____________________________________________________________

import { useEffect, useState } from "react";
import useLocationStore from "../store/locationStore";
import useServiceFilterStore from "../store/serviceFilterStore";
import { Slider } from "@mui/material";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ServicesDisplay = () => {
  const { selectedSubService, filters, setFilters } = useServiceFilterStore();
  const { availability, priceRange, sortBy } = filters;
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setPage(1);
  }, [selectedSubService, availability, priceRange, sortBy]);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category: selectedSubService || "",
          availability,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          sort: sortBy || "",
          page,
          limit: 9,
        });
        const res = await fetch(`/api/services?${params}`);
        const data = await res.json();
        setServices(data.services);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
        toast.error("Could not load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [selectedSubService, availability, priceRange, sortBy, page]);

  const handleSortChange = (e) => {
    setFilters({ sortBy: e.target.value });
  };

  const totalPages = Math.ceil(total / 9);

  return (
    <section className="py-10 px-4 lg:px-16 bg-base-100">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl font-bold text-primary">
          Services Available {selectedSubService && `– ${selectedSubService}`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-base-200 p-4 rounded-xl shadow-sm">
          <div>
            <label className="font-semibold">Price Range (₹)</label>
            <Slider
              value={priceRange}
              onChange={(_, val) => setFilters({ priceRange: val })}
              min={0}
              max={5000}
              step={100}
              valueLabelDisplay="auto"
            />
          </div>
          <div>
            <label className="font-semibold">Availability</label>
            <select
              className="select select-bordered w-full mt-1"
              value={filters.availability}
              onChange={(e) => setFilters({ availability: e.target.value })}
            >
              <option value="any">Any</option>
              <option value="today">Available Today</option>
              <option value="this week">This Week</option>
              <option value="weekend only">Weekend Only</option>
              <option value="fully booked">Fully Booked</option>
              <option value="available now">Available Now</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Sort By</label>
            <select
              className="select select-bordered w-full mt-1"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Default</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              {s.image && (
                <figure>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-48 w-full object-cover rounded-t-lg"
                  />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title text-primary">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
                <p className="font-semibold mt-2">₹{s.price}</p>
                <p className="text-sm text-gray-500">
                  Professional: {s.createdBy?.name || "Unknown"}
                </p>

                {Math.random() < 0.2 && (
                  <span className="badge badge-primary uppercase">Popular</span>
                )}
                <div className="card-actions mt-4">
                  <button
                    onClick={() => navigate(`/book/${s._id}`)}
                    className="btn btn-primary btn-sm w-full"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${
                page === i + 1 ? "btn-disabled" : "btn-ghost"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ServicesDisplay;
