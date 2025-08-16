import { useState, useEffect } from "react";
import useLocationStore from "../store/locationStore";
import { toast } from "react-hot-toast";

export default function LocationInput({ onChange }) {
  const { location, setLocation } = useLocationStore();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [saving, setSaving] = useState(false);

  const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  // 🔐 Detect login and role
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // 'customer' or 'technician'

  const isLoggedIn = Boolean(token && role);

  // 📍 Handle GPS
  const handleGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const fullAddress = data?.display_name || `${latitude}, ${longitude}`;
          setLocation(fullAddress);
          onChange?.(fullAddress);
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
          const fallback = `${latitude}, ${longitude}`;
          setLocation(fallback);
          onChange?.(fallback);
          alert("Could not fetch readable address. Using coordinates.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        alert("Failed to get location: " + err.message);
      }
    );
  };

  // 🧠 Autocomplete Suggestions
  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const res = await fetch(
        `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(
          query
        )}&limit=5&format=json`
      );
      const data = await res.json();
      setSuggestions(data || []);
    } catch (err) {
      console.error("Autocomplete failed:", err);
      setSuggestions([]);
    }
  };

  const handleChange = (value) => {
    setLocation(value);
    onChange?.(value);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(
      setTimeout(() => {
        fetchSuggestions(value);
      }, 300)
    );
  };

  const handleSelectSuggestion = (suggestion) => {
    const selected = suggestion.display_name;
    setLocation(selected);
    onChange?.(selected);
    setSuggestions([]);
  };

  // 💾 Save Location to backend
  const handleSave = async () => {
    try {
      const role = localStorage.getItem("role"); // "customer" or "technician"
      const token = localStorage.getItem("token");
      const apiBase = import.meta.env.VITE_API_BASE_URL || ""; // e.g. http://localhost:5000

      const endpoint =
        role === "technician"
          ? `${apiBase}/api/technician/location`
          : `${apiBase}/api/customer/location`;

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ location }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Something went wrong");
      }

      const data = await res.json();
      console.log("✅ Location saved:", data);
      toast.success("Location updated successfully");
    } catch (err) {
      console.error("Error saving location:", err);
      toast.error("Failed to save location");
    }
  };

  return (
    <div className="relative max-w-[320px] space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="input input-sm input-bordered w-full"
          value={location}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter location"
        />
        <button
          type="button"
          className={`btn btn-sm btn-accent ${loading ? "loading" : ""}`}
          onClick={handleGPS}
          disabled={loading}
        >
          📍
        </button>
        {isLoggedIn && (
          <button
            type="button"
            className={`btn btn-sm btn-success ${saving ? "loading" : ""}`}
            onClick={handleSave}
            disabled={saving}
          >
            Save
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white shadow rounded mt-1 border max-h-[200px] overflow-y-auto">
          {suggestions.map((sugg, idx) => (
            <li
              key={idx}
              className="p-2 hover:bg-accent hover:text-white cursor-pointer text-sm"
              onClick={() => handleSelectSuggestion(sugg)}
            >
              {sugg.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* ✅ Save button (only if logged in) */}
    </div>
  );
}
