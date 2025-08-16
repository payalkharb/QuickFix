import Navbar from "../../components/Navbar";
import WelcomeHeader from "../../components/WelcomeHeader";
import CustomerSupport from "../../components/CustomerSupport";
import AboutUsSection from "../../components/AboutUsSection";
import ContactUsSection from "../../components/ContactUsSection";
import Footer from "../../components/Footer";
import ServicesDisplay from "../../components/ServicesDisplay";
import FAQ from "../../components/FAQ";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <WelcomeHeader />

        <ServicesDisplay />
        {/* <CustomerSupport /> */}
        {/* <AboutUsSection /> */}
        <FAQ />
        <ContactUsSection />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
