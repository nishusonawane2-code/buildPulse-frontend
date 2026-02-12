import React from "react";
import { useNavigate } from "react-router-dom";
import { Calculator, IndianRupee, TrendingUp } from "lucide-react";

const CostEstimatorCard = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-8 md:p-12 relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Estimate Your Construction <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Cost Instantly
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
              Quickly calculate how much it will cost to build your home with
              <span className="text-orange-400 font-semibold ml-1">BuiltPulse's</span> detailed, reliable estimation tool.
            </p>
          </div>

          <button
            onClick={() => navigate("/estimator")}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-orange-500 rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-[0_10px_20px_-10px_rgba(249,115,22,0.5)]"
          >
            Calculate Cost Instantly
            <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Right Illustration Area */}
        <div className="flex-1 relative hidden md:flex justify-center items-center">
          <div className="relative w-72 h-72">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>

            {/* Calculator Icon Mockup */}
            <div className="relative z-20 transform rotate-[-10deg] hover:rotate-0 transition-transform duration-500">
              <div className="w-56 h-72 bg-gray-900 border-2 border-gray-700 rounded-[2rem] p-6 shadow-2xl flex flex-col gap-4">
                <div className="h-16 bg-black rounded-xl border border-gray-800 flex items-center justify-end px-4">
                  <span className="text-blue-400 font-mono text-2xl">0</span>
                </div>
                <div className="grid grid-cols-4 gap-2 flex-grow">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="bg-gray-800/50 rounded-lg aspect-square"></div>
                  ))}
                </div>
              </div>

              {/* Overlaying Elements */}
              <div className="absolute -bottom-6 -left-8 bg-blue-600 p-4 rounded-2xl shadow-xl transform rotate-12">
                <IndianRupee className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-6 -right-8 bg-orange-500 p-3 rounded-full shadow-xl transform -rotate-12">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimatorCard;
