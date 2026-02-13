import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import leadService from "../api/leadService";
import estimationService from "../api/estimationService";

const Estimator = () => {
  // Step 1: Input Details -> Step 2: Input Lead Info -> Submit
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    city: "",
    builtUpArea: "",
    floors: 1,
    quality: "STANDARD",
  });

  const [useDimensions, setUseDimensions] = useState(false);
  const [dimensions, setDimensions] = useState({ length: "", width: "" });

  // Update builtUpArea when dimensions change
  useEffect(() => {
    if (useDimensions && dimensions.length && dimensions.width) {
      const area = Number(dimensions.length) * Number(dimensions.width);
      setFormData(prev => ({ ...prev, builtUpArea: area.toString() }));
    }
  }, [dimensions, useDimensions]);

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    // Only allow numeric input
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    setDimensions({ ...dimensions, [name]: sanitizedValue });
  };

  const [leadData, setLeadData] = useState({
    name: "",
    phone: "",
    email: "",
    source: "ESTIMATOR",
    category: "RESIDENTIAL"
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // Sanitize builtUpArea to only allow numbers
    if (name === "builtUpArea") {
      const sanitizedValue = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: sanitizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLeadChange = (e) => {
    setLeadData({ ...leadData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.city || !formData.builtUpArea) {
      setError("Please fill in all construction details.");
      return;
    }
    setError("");
    setStep(2);
  };

  const submitFullEstimate = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Create Lead
      const createdLead = await leadService.createLead({
        ...leadData,
        city: formData.city
      });
      if (!createdLead || !createdLead.id) {
        throw new Error("Failed to capture lead details.");
      }

      // 2. Create Estimate linked to Lead
      const estimatePayload = {
        leadId: createdLead.id,
        builtUpArea: Number(formData.builtUpArea),
        floors: Number(formData.floors),
        quality: formData.quality,
        city: formData.city === "Nashik" ? "Malegaon" : "Dhule" // Simple mapping for now
      };

      const estimateResult = await estimationService.createEstimate(estimatePayload);
      setResult(estimateResult);
      setStep(3); // Result Step

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-orange-100 overflow-hidden">
      <Navbar />

      {/* Cinematic Background Layer */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover blur-[4px] scale-105 opacity-40"
          alt="Architectural Backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-black"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">

          {/* Header Section */}
          <div className="mb-12 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 px-4 py-2 rounded-full mb-4 backdrop-blur-md border border-orange-500/20">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 leading-none">Smart Calculation Engine</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-4 uppercase">
              Estimator<span className="text-orange-500">.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg max-w-xl">
              Precision-engineered construction forecasting. Get a data-driven reveal for your next deployment.
            </p>
          </div>

          {/* Main Glassmorphism Card */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* Background Light Glow */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 blur-[100px] pointer-events-none group-hover:bg-orange-500/20 transition-all duration-700"></div>

            {/* Progress Stepper */}
            {step < 3 && (
              <div className="mb-12 relative flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 1 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-110' : 'bg-white/10 text-slate-500'}`}>
                    01
                  </div>
                  <div className={`h-[2px] w-20 transition-all duration-700 ${step >= 2 ? 'bg-orange-500' : 'bg-white/10'}`}></div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 2 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-110' : 'bg-white/10 text-slate-500'}`}>
                    02
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Current Sector</span>
                  <span className="text-white font-black uppercase tracking-tight text-sm">
                    {step === 1 ? 'Technical Specs' : 'Signal Routing'}
                  </span>
                </div>
              </div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                <span className="font-bold mr-2 uppercase text-[10px] tracking-widest">Protocol ERROR:</span> {error}
              </div>
            )}

            {/* STEP 1: CONSTRUCTION DETAILS */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 transition-colors group-focus-within/field:text-orange-500">Operation City</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all cursor-pointer hover:bg-white/10"
                      required
                    >
                      <option value="" className="bg-slate-900">Select City</option>
                      <option value="Nashik" className="bg-slate-900">Nashik</option>
                      <option value="Malegaon" className="bg-slate-900">Malegaon</option>
                      <option value="Dhule" className="bg-slate-900">Dhule</option>
                    </select>
                  </div>

                  <div className="space-y-2 group/field">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 transition-colors group-focus-within/field:text-orange-500 leading-none">Built-Up Area (sqft)</label>
                      <button
                        type="button"
                        onClick={() => setUseDimensions(!useDimensions)}
                        className="text-[8px] font-black uppercase tracking-widest text-orange-500 hover:text-white transition-colors border border-orange-500/30 px-2 py-1 rounded-md bg-orange-500/5 hover:bg-orange-500"
                      >
                        {useDimensions ? "Close Fix" : "Dimensions"}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        name="builtUpArea"
                        value={formData.builtUpArea}
                        onChange={handleFormChange}
                        placeholder="e.g. 2500"
                        readOnly={useDimensions}
                        className={`w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-600 hover:bg-white/10 ${useDimensions ? 'bg-orange-500/5 border-orange-500/20 text-orange-400' : ''}`}
                        required
                      />
                      {!useDimensions && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
                          <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">SqFt Unit</span>
                        </div>
                      )}
                    </div>

                    {/* Compact Dimension Helper Dropdown-style */}
                    <div className={`transition-all duration-500 overflow-hidden bg-white/5 border border-white/10 rounded-2xl px-4 ${useDimensions ? 'mt-2 py-4 opacity-100 max-h-40' : 'mt-0 py-0 opacity-0 max-h-0 border-transparent bg-transparent'}`}>
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-1">Length (ft)</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            name="length"
                            value={dimensions.length}
                            onChange={handleDimensionChange}
                            placeholder="50"
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-orange-500/50"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 ml-1">Width (ft)</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            name="width"
                            value={dimensions.width}
                            onChange={handleDimensionChange}
                            placeholder="20"
                            className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-orange-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 transition-colors group-focus-within/field:text-orange-500">Structural Layers</label>
                    <select
                      name="floors"
                      value={formData.floors}
                      onChange={handleFormChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all cursor-pointer hover:bg-white/10"
                    >
                      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} className="bg-slate-900">G + {n - 1} Levels</option>)}
                    </select>
                  </div>

                  <div className="space-y-2 group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 transition-colors group-focus-within/field:text-orange-500">Material Grade</label>
                    <select
                      name="quality"
                      value={formData.quality}
                      onChange={handleFormChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all cursor-pointer hover:bg-white/10"
                    >
                      <option value="BASIC" className="bg-slate-900">Basic (Streamlined)</option>
                      <option value="STANDARD" className="bg-slate-900">Standard (Optimal)</option>
                      <option value="PREMIUM" className="bg-slate-900">Premium (Masterclass)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="w-full group/btn bg-white text-slate-900 hover:bg-orange-500 hover:text-white font-black uppercase tracking-[0.3em] text-[10px] py-6 rounded-2xl transition-all duration-500 relative overflow-hidden active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Initialize Calculation <span className="text-xl">→</span>
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: LEAD CAPTURE */}
            {step === 2 && (
              <form onSubmit={submitFullEstimate} className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-3xl">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Signal Routing Sequence.</h3>
                  <p className="text-slate-500 text-sm font-medium tracking-wide">Enter coordinates to receive the complete architectural valuation ledger.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 transition-colors group-focus-within/field:text-orange-500">Identity Name</label>
                    <input
                      type="text"
                      name="name"
                      value={leadData.name}
                      onChange={handleLeadChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-700 hover:bg-white/10"
                      required
                    />
                  </div>

                  <div className="space-y-2 group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 transition-colors group-focus-within/field:text-orange-500">Frequency Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={leadData.phone}
                      onChange={handleLeadChange}
                      placeholder="+91 Operational Link"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-700 hover:bg-white/10"
                      required
                    />
                  </div>

                  <div className="space-y-2 group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 transition-colors group-focus-within/field:text-orange-500">Digital Transmission Link (Email)</label>
                    <input
                      type="email"
                      name="email"
                      value={leadData.email}
                      onChange={handleLeadChange}
                      placeholder="ledgersrc@builtpulse.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all placeholder:text-slate-700 hover:bg-white/10"
                      required
                    />
                  </div>

                  <div className="space-y-2 group/field">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1 transition-colors group-focus-within/field:text-orange-500">Project Classification</label>
                    <select
                      name="category"
                      value={leadData.category}
                      onChange={handleLeadChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all cursor-pointer hover:bg-white/10"
                      required
                    >
                      <option value="RESIDENTIAL" className="bg-slate-900">Residential Axis</option>
                      <option value="COMMERCIAL" className="bg-slate-900">Commercial infrastructure</option>
                      <option value="INTERIOR" className="bg-slate-900">Interior Crafting</option>
                      <option value="INDUSTRIAL" className="bg-slate-900">Industrial Core</option>
                      <option value="RENOVATION" className="bg-slate-900">Renovation Protocol</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 py-6 rounded-2xl hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
                  >
                    Adjust Specs
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-600 text-white font-black uppercase tracking-[0.3em] text-[10px] py-6 rounded-2xl hover:bg-orange-500 transition-all active:scale-[0.98] shadow-xl shadow-orange-600/20 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Generate Reveal'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 text-center mt-6 uppercase tracking-wider font-bold">
                  By clicking "Generate Reveal", you agree to our{" "}
                  <Link to="/privacy-policy" className="text-orange-500 underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}

            {/* STEP 3: RESULT */}
            {step === 3 && result && (
              <div className="animate-in zoom-in-95 duration-700 text-center py-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-orange-500/20 border border-orange-500/30 mb-8 shadow-2xl shadow-orange-500/10">
                  <span className="text-4xl text-orange-500">💰</span>
                </div>

                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 mb-6">Valuation Computed.</h3>

                <div className="relative mb-10">
                  <div className="absolute inset-0 blur-[60px] bg-orange-500/10 rounded-full scale-150"></div>
                  <h4 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none relative z-10">
                    ₹{result.total.toLocaleString()}
                  </h4>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 backdrop-blur-md">
                  <div className="grid grid-cols-3 divide-x divide-white/5">
                    <div className="px-4">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Scale</span>
                      <span className="text-white font-black text-sm uppercase">{formData.builtUpArea} sqft</span>
                    </div>
                    <div className="px-4">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Complexity</span>
                      <span className="text-white font-black text-sm uppercase">G + {formData.floors - 1}</span>
                    </div>
                    <div className="px-4">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Standard</span>
                      <span className="text-white font-black text-sm uppercase">{formData.quality}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button
                    onClick={() => { setStep(1); setFormData({ ...formData, builtUpArea: '' }); }}
                    className="px-12 py-5 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/10"
                  >
                    Recalibrate Logic
                  </button>
                  <button
                    onClick={() => window.location.href = '/contact-us'}
                    className="px-12 py-5 bg-transparent border-2 border-orange-500 text-orange-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                  >
                    Consult Nexus
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Verification Banner */}
          <div className="mt-12 flex items-center justify-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">ISO 9001:2015</span>
            <span className="w-px h-4 bg-slate-700"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Data Encryption Active</span>
            <span className="w-px h-4 bg-slate-700"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">BuiltPulse Core 2.0</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Estimator;
