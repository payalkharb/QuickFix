const categories = [
  { name: "Electrician", icon: "🔌" },
  { name: "Plumber", icon: "🚿" },
  { name: "Cleaning", icon: "🧹" },
  { name: "Carpentry", icon: "🪚" },
  { name: "AC Repair", icon: "❄️" },
  { name: "Pest Control", icon: "🐜" },
];

const ServiceCategories = () => {
  return (
    <div className="px-4 py-6">
      <h3 className="text-xl font-bold mb-4 text-center">Popular Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="card shadow-md bg-base-100 hover:bg-base-200 transition cursor-pointer"
          >
            <div className="card-body items-center text-center">
              <span className="text-3xl">{cat.icon}</span>
              <h2 className="card-title text-base">{cat.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;
