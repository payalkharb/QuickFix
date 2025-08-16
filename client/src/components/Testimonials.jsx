// src/components/Testimonials.jsx
import React from "react";
import TestimonialCard from "./TestimonialsCard";

const testimonials = [
  {
    quote:
      "“From salon to handyman, every professional arrived swiftly, handled tasks efficiently, and cleaned up before leaving. Trustworthy and skilled.”",
    name: "Anita Sharma, Delhi",
    handle: "@anitaSharma",
    image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?…&q=80",
  },
  {
    quote:
      "“The home deep-clean was exceptional. Even the grout lines looked new again and I couldn’t believe how fresh everything smelled afterward.”",
    name: "Rajiv Menon, Bangalore",
    handle: "@rajivmenon",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?…&q=80",
  },
  {
    quote:
      "“Tried the electrical installation service; the technician was precise, careful, and wrapped up ahead of schedule. Excellent experience overall.”",
    name: "Neha Gupta, Mumbai ",
    handle: "@nehagupta",
    image:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?…&q=80",
  },
  {
    quote:
      "“Electrician fixed it fast and explained everything clearly. No surprises.”",
    name: "Priya, Hyderabad ",
    handle: "@priya67789",
    image:
      "https://plus.unsplash.com/premium_photo-1670282393309-70fd7f8eb1ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "“On-time haircut at home with zero mess. Exactly what I expected.”",
    name: "Akshay, Gurgaon ",
    handle: "@Akshay",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "“Quick, professional cleaning—my apartment looked brand new in less than 2 hours.”",
    name: "Meera, Bengaluru",
    handle: "@merra21111",
    image:
      "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // add more...
];

const Testimonials = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-3xl mx-auto text-center space-y-2">
      <h2 className="text-blue-800 text-3xl font-bold">Testimonials</h2>
      <p className="text-gray-600">
        We have worked with thousands of amazing people
      </p>
    </div>

    <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((t, idx) => (
        <figure
          key={idx}
          className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center space-y-4 w-full overflow-hidden"
        >
          <blockquote className="text-gray-800 italic break-words">
            <p>{t.quote}</p>
          </blockquote>
          <figcaption className="flex items-center space-x-4">
            <img
              src={t.image}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">{t.name}</div>
              <div className="text-blue-800">{t.handle}</div>
            </div>
            {t.logo && (
              <img
                src={t.logo}
                alt="logo"
                className="h-8 ml-auto opacity-80 flex-shrink-0"
              />
            )}
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default Testimonials;
