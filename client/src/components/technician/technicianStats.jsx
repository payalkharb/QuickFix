// src/components/technician/TechnicianStats.jsx
import React from "react";
import { IndianRupee } from "lucide-react";

export default function TechnicianStats({ total, count }) {
  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      <div className="card p-4 bg-white shadow-md">
        <h3 className="text-sm font-medium text-gray-600">Completed Jobs</h3>
        <p className="text-2xl font-bold mt-2">{count}</p>
      </div>
      <div className="card p-4 bg-white shadow-md flex flex-col justify-between">
        <h3 className="text-sm font-medium text-gray-600">Total Earnings</h3>
        <div className="flex items-center mt-2">
          <IndianRupee className="w-6 h-6 text-green-600" />
          <span className="text-2xl font-bold text-green-700 ml-1">
            {total.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
