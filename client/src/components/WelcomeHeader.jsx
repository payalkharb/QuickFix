import useLocationStore from "../store/locationStore";
import useAuthStore from "../store/authStore"; // <-- ✅
import { motion } from "framer-motion";

// Reusable fade-in variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const WelcomeHeader = () => {
  const location = useLocationStore(
    (state) => state.location || "your location"
  );
  const user = useAuthStore((state) => state.user); // <-- Get user from store

  const customerName = user?.name || "User"; // fallback

  return (
    <div className="relative overflow-hidden px-6 md:px-20 py-16 bg-gradient-to-r from-blue-50 via-white to-pink-50 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Optional subtle SVG pattern */}
      <svg
        className="absolute top-0 left-0 opacity-10 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path d="M0 100 L100 0" stroke="gray" strokeWidth="0.2" />
      </svg>

      {/* Left Section */}
      <motion.div
        className="z-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-primary mb-4"
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
        >
          Welcome, {customerName} 👋
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-gray-800 mb-2"
          variants={fadeInUp}
        >
          We’re glad to have you on board!
        </motion.p>

        <motion.p className="text-lg text-gray-700" variants={fadeInUp}>
          Showing services near:{" "}
          <span className="text-primary">{location}</span>
        </motion.p>
      </motion.div>

      {/* Right Card */}
      <motion.div
        className="z-10 bg-primary text-white p-6 md:p-8 rounded-xl shadow-xl w-full md:w-[420px] hover:scale-105 transition duration-300"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <motion.h3
          className="text-2xl md:text-3xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Explore Our Services
        </motion.h3>

        <motion.p
          className="text-white/90 text-base mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Tap the “All Services” menu on the top-right to browse categories.
        </motion.p>

        <motion.p
          className="text-white/80 text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2,
          }}
        >
          Trusted professionals at your doorstep!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default WelcomeHeader;
