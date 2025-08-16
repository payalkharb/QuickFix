import useLocationStore from "../store/locationStore";

const LocationGreeting = () => {
  const location = useLocationStore((state) => state.location);

  return (
    <div className="text-center mt-6 mb-4">
      <h2 className="text-2xl font-semibold">
        👋 Welcome! Showing services near{" "}
        <span className="text-primary font-bold">
          {location || "your area"}
        </span>
      </h2>
    </div>
  );
};

export default LocationGreeting;
