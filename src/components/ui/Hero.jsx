import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { toast } from "sonner";

import House from "../../assets/house3.png";
import BgImage from "../../assets/background.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Enter valid 10-digit phone number";
    if (!form.city) newErrors.city = "Please select a city";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        const response = await axiosClient.post("/leads", {
          ...form,
          source: "WEBSITE",
        });

        if (response.status === 200 || response.status === 201) {
          toast.success("Consultation booked successfully!");
          // ✅ Redirect to Thank You page
          navigate("/thank-you");
          // optional: reset form
          setForm({ name: "", email: "", phone: "", city: "" });
        }
      } catch (error) {
        console.error("Error booking consultation:", error);
        toast.error(error.response?.data?.message || "Failed to book consultation. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-3 bg-white/70"></div>

      {/* Content */}
      <div className="relative z-10">


        {/* Hero Body */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
                CONSTRUCT YOUR <br />
                <span className="text-orange-500">DREAM HOME</span>
              </h1>

              <div className="flex flex-wrap gap-4 items-center">
                <span className="px-3 py-1 border-2 border-gray-300 text-sm font-semibold rounded-full">
                  India’s <b>No.1</b>
                </span>
                <span className="px-3 py-1 border-2 border-gray-300 text-sm font-semibold rounded-full">
                  Tech-Enabled Construction
                </span>
                <span className="px-3 py-1 bg-black text-white text-sm font-semibold rounded-full">
                  10 YEAR WARRANTY
                </span>
              </div>

              <div className="w-full mt-3 transform hover:scale-105 transition duration-500">
                <img
                  src={House}
                  alt="Modern Home"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
                  Talk to Our Expert
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      disabled={loading}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      disabled={loading}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="+91 Phone Number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      disabled={loading}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      disabled={loading}
                    >
                      <option value="">Select City</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Malegaon">Malegaon</option>
                      <option value="Dhule">Dhule</option>
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-3 rounded-xl font-bold text-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Booking...
                      </>
                    ) : (
                      "Book Free Consultation"
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
