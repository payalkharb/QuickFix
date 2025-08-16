import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/Testimonials";
import useLocationStore from "../store/locationStore";
import Footer from "../components/Footer";
import About from "../components/AboutUsSection";
import Contact from "../components/ContactUsSection";
import ServicesDisplay from "../components/ServicesDisplay";
import FAQ from "../components/FAQ";
import Stats from "../components/Stats";

const HomePage = () => {
  const location = useLocationStore((state) => state.location);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="px-6 md:px-20 py-10 space-y-10">
          <h2 className="text-xl font-semibold">
            Showing services near:{" "}
            <span className="text-primary">{location || "your location"}</span>
          </h2>

          <ServicesDisplay />
        </div>
        <Stats />
        <Testimonials />
        <FAQ />

        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
