import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 rounded-lg bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-orange-500">
          Thank You!
        </h1>

        <p className="mt-3 text-gray-700">
          Our expert will contact you shortly for a free consultation.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 rounded-md bg-orange-500 px-6 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
