import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero4.jpg"; // Add your image to src/assets/hero.png or update the path

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="bg-base-100 py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10"
    >
      {/* Left side text */}
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-primary">Professionals</span> at Your Doorstep,{" "}
          <br />
          Just a <span className="text-primary">Click</span> Away 💙
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          The fastest way to hire verified home service experts — trusted by
          thousands of families.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/customer")}
          >
            Book a Service →
          </button>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => navigate("/technician")}
          >
            Join as a Professional
          </button>
        </div>
      </div>

      {/* Right side image */}
      <div className="flex-1 max-w-md">
        <img
          src={heroImage}
          alt="Service professionals"
          className="size-full object-contain rounded-lg"
        />
      </div>
    </section>
  );
}
