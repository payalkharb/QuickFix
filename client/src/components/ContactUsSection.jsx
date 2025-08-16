"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Error sending email:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        id="contact-us"
        className="min-h-screen flex items-center justify-center bg-blue-50"
      >
        <h2 className="text-3xl font-bold text-indigo-700">
          Thank you for contacting our team!
        </h2>
      </div>
    );
  }

  return (
    <div id="contact-us" className="bg-white py-12">
      <div className="isolate bg-blue-50 px-6 py-24 sm:py-32 lg:px-8 rounded-xl shadow-lg max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Contact Us
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            We’ll get back to you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-2.5 w-full rounded-md border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-2.5 w-full rounded-md border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-900">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-2.5 w-full rounded-md border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-900">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2.5 w-full rounded-md border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-900">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2.5 w-full rounded-md border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-900">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-2.5 w-full rounded-md border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm"
              />
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={loading}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
            >
              {loading ? "Sending..." : "Let's talk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
