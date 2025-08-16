import React from "react";
import { MapPin, IndianRupee } from "lucide-react";

const ServiceCard = ({ service }) => {
  const {
    serviceName,
    description,
    price,
    technicianId,
    location = "Unknown",
  } = service;

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{serviceName}</h2>
        <p className="text-sm text-gray-600">{description}</p>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <IndianRupee className="w-4 h-4" />
          <span className="font-medium">{price}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{technicianId?.location || location}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
