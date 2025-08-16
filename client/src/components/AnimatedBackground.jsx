import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <>
      {/* Rotating blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-purple-300 rounded-full opacity-30 top-10 left-10 z-0 blur-2xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-pink-300 rounded-full opacity-30 bottom-20 right-20 z-0 blur-2xl"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      {/* Subtle SVG pattern */}
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0"
        aria-hidden="true"
      ></div>
    </>
  );
}
