// // #########################################
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logoutUser from "../../utils/logout";
// import LocationInput from "../LocationInput";

// import { ShoppingCart, User, Search } from "lucide-react";

// export default function CustomerNavbar() {
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [location, setLocation] = useState(""); // 👈 Capture location from LocationInput

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
//       {/* Logo */}
//       <div
//         className="text-2xl font-bold text-black cursor-pointer flex gap-1.5"
//         onClick={() => navigate("/")}
//       >
//         <div className="bg-black w-16 h-8 rounded-xl flex items-center justify-center">
//           <span className="text-white">abc</span>
//         </div>
//         Company
//       </div>

//       {/* Service Categories */}
//       <div className="space-x-6 hidden md:flex">
//         <button className="text-gray-700 hover:text-primary">Beauty</button>
//         <button className="text-gray-700 hover:text-primary">
//           Wall Panels
//         </button>
//         <button className="text-gray-700 hover:text-primary">Cleaning</button>
//       </div>

//       {/* Right side: Location, Search, Cart, Profile */}
//       <div className="flex items-center space-x-4">
//         <LocationInput onChange={(val) => setLocation(val)} />

//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search services..."
//             className="input input-bordered pl-10 w-40 md:w-60"
//           />
//           <Search
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//             size={18}
//           />
//         </div>

//         <ShoppingCart
//           size={22}
//           className="text-gray-600 hover:text-primary cursor-pointer"
//           onClick={() => navigate("/customer/cart")}
//         />

//         {/* Profile Dropdown */}
//         <div className="relative">
//           <User
//             size={26}
//             className="text-gray-600 hover:text-primary cursor-pointer"
//             onClick={() => setShowDropdown(!showDropdown)}
//           />
//           {showDropdown && (
//             <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
//               <button
//                 className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                 onClick={() => navigate("/customer/bookings")}
//               >
//                 My Bookings
//               </button>
//               <button
//                 className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                 onClick={() => navigate("/customer/help")}
//               >
//                 Help Center
//               </button>
//               <button
//                 className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
//                 onClick={() => logoutUser(navigate)}
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutUser from "../../utils/logout";
import LocationInput from "../LocationInput";
import { ShoppingCart, User, Search } from "lucide-react";
import useLocationStore from "../../store/locationStore";

export default function CustomerNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { location } = useLocationStore();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-black cursor-pointer flex gap-1.5"
        onClick={() => navigate("/")}
      >
        <div className="bg-black w-16 h-8 rounded-xl flex items-center justify-center">
          <span className="text-white">abc</span>
        </div>
        Company
      </div>

      {/* Categories */}
      <div className="space-x-6 hidden md:flex">
        <button className="text-gray-700 hover:text-primary">Beauty</button>
        <button className="text-gray-700 hover:text-primary">
          Wall Panels
        </button>
        <button className="text-gray-700 hover:text-primary">Cleaning</button>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        <LocationInput />

        <div className="relative">
          <input
            type="text"
            placeholder="Search services..."
            className="input input-bordered pl-10 w-40 md:w-60"
          />
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        <ShoppingCart
          size={22}
          className="text-gray-600 hover:text-primary cursor-pointer"
          onClick={() => navigate("/customer/cart")}
        />

        <div className="relative">
          <User
            size={26}
            className="text-gray-600 hover:text-primary cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => navigate("/customer/bookings")}
              >
                My Bookings
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => navigate("/customer/help")}
              >
                Help Center
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                onClick={() => logoutUser(navigate)}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
