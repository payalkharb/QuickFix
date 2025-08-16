import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "../../components/AnimatedBackground";
import clickSound from "../../assets/click.mp3";

export default function TechnicianOptions() {
  const playClick = () => new Audio(clickSound).play();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-teal-100 px-4 overflow-hidden">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-base-100 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-8 w-full max-w-sm text-center z-10"
      >
        <div className="flex justify-center mb-4">
          <Wrench className="w-10 h-10 text-primary animate-bounce" />
        </div>
        <h1 className="text-2xl font-bold mb-6">Technician</h1>

        <div className="space-y-4">
          <Link
            to="/technician/signup"
            className="btn btn-primary w-full transition-transform duration-300 hover:scale-105"
            onClick={playClick}
          >
            Signup
          </Link>
          <Link
            to="/technician/login"
            className="btn btn-secondary w-full transition-transform duration-300 hover:scale-105"
            onClick={playClick}
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
