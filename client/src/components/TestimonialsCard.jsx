// src/components/TestimonialCard.jsx
import React from "react";

const TestimonialCard = ({ quote, name, handle, image, logo }) => (
  <figure className="bg-white rounded‑lg shadow p‑6 flex flex‑col items‑center text‑center space‑y‑4">
    <blockquote className="text-gray‑800 italic">
      <p>{quote}</p>
    </blockquote>
    <figcaption className="flex items‑center space‑x‑4">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="text-left">
        <div className="font-semibold text-gray-900">{name}</div>
        <div className="text-blue-500">{handle}</div>
      </div>
      {logo && <img src={logo} alt="logo" className="h-8 ml-auto opacity-80" />}
    </figcaption>
  </figure>
);

export default TestimonialCard;
