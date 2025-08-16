// src/components/services/TechnicianServiceCard.jsx
import React from "react";
import { MapPin, IndianRupee } from "lucide-react";

const TechnicianServiceCard = ({ service, onEdit, onDelete }) => {
  const { title, description, price, image, category } = service;

  return (
    <div className="card bg-base-100 shadow-md overflow-hidden">
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {category && <p className="text-sm text-gray-500 mt-1">{category}</p>}
        {description && (
          <p className="text-sm text-gray-700 mt-2">{description}</p>
        )}
        <div className="mt-3 flex items-center gap-1 text-gray-600">
          <IndianRupee className="w-5 h-5" />
          <span className="font-medium">{price}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(service)}
            className="btn btn-primary btn-sm flex-1"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(service._id)}
            className="btn btn-error btn-outline btn-sm flex-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianServiceCard;
