import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-lg px-3 py-1">
              <span className="text-primary text-xl font-bold">ABC</span>
            </div>
            <span className="text-white text-xl font-semibold">Company</span>
          </div>
          <p className="text-sm mt-2 text-white/80 max-w-xs">
            Your one-stop solution for at-home services by verified
            professionals.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#navbar"
                className="text-white hover:text-blue-300 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about-us"
                className="text-white hover:text-black transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#contact-us"
                className="text-white hover:text-black transition"
              >
                Contact Us
              </a>
            </li>
            <li>
              <label
                htmlFor="service-drawer"
                className="text-white hover:text-black transition"
              >
                Services
              </label>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-white">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-white/80">
        &copy; {new Date().getFullYear()} ABC Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
