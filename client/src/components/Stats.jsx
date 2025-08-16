import React, { useEffect, useState } from "react";
import { Star, Users, Wrench, CheckCircle, Globe } from "lucide-react";

export default function Stats() {
  const stats = [
    { icon: Star, value: "4.8", label: "Service Rating*" },
    { icon: Users, value: "12M+", label: "Customers Globally*" },
    { icon: Wrench, value: "150K+", label: "Jobs Completed" },
    { icon: CheckCircle, value: "98%", label: "Satisfaction Rate" },
    { icon: Globe, value: "24+", label: "Cities Served" },
  ];

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`py-12 transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-center">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`flex flex-col items-center space-y-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              <Icon
                className={`w-8 h-8 ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <div className="text-xl font-bold">{stat.value}</div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
