import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { toast } from "sonner";

const ConsultPopup = ({ openModal, setOpenModal, navigate }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        category: "RESIDENTIAL",
    });

    if (!openModal) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axiosClient.post("/leads", {
                ...form,
                source: "ESTIMATOR", // Or dynamic if needed, but fitting for floor plans
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Consultation booked successfully!");
                setOpenModal(false);
                navigate("/thank-you");
            }
        } catch (error) {
            console.error("Error booking consultation:", error);
            toast.error(error.response?.data?.message || "Failed to book. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floor Plan Consultation Popup */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                <div className="relative flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white/95 shadow-2xl">

                    {/* Close */}
                    <button
                        onClick={() => setOpenModal(false)}
                        className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-gray-600 transition"
                        disabled={loading}
                    >
                        ✕
                    </button>

                    {/* Left Image */}
                    <div className="hidden w-1/2 md:block">
                        <img
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                            alt="Floor Plan"
                            className="h-full w-full object-cover rounded-tr-4xl"
                        />
                    </div>


                    {/* Right Form */}
                    <div className="w-full p-10 md:w-1/2">
                        <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">
                            Floor Plans that bring every corner of your home to life
                        </h2>


                        <p className="mt-2 text-sm text-gray-600">
                            Get expert guidance for your dream home — free consultation.
                        </p>

                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none transition disabled:bg-gray-100"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />

                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none transition disabled:bg-gray-100"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />

                            <input
                                type="tel"
                                placeholder="+91 Phone Number"
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none transition disabled:bg-gray-100"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />

                            <select
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none transition disabled:bg-gray-100"
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                            >
                                <option value="">Location of your Plot - City</option>
                                <option>Pune</option>
                                <option>Mumbai</option>
                                <option>Bangalore</option>
                                <option>Hyderabad</option>
                            </select>

                            <select
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:outline-none transition disabled:bg-gray-100"
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                            >
                                <option value="RESIDENTIAL">Residential</option>
                                <option value="COMMERCIAL">Commercial</option>
                                <option value="INTERIOR">Interior</option>
                                <option value="INDUSTRIAL">Industrial</option>
                                <option value="RENOVATION">Renovation</option>
                            </select>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 py-3 text-sm font-bold text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Booking..." : "Book FREE Consultation"}
                            </button>
                        </form>

                        <p className="mt-4 text-xs text-gray-500">
                            By submitting, you agree to our{" "}
                            <Link to="/privacy-policy" onClick={() => setOpenModal(false)} className="text-orange-500 underline">
                                privacy policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConsultPopup;
