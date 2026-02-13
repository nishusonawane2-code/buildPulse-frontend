import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ConsultPopup from "./ConsultPopUp";

const floorPlans = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    likes: 40,
    type: "Residential",
    size: "20x30 sq.ft",
    floors: "G+4",
    area: "32.10L",
    cost: "31.8L",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?q=80&w=880&auto=format&fit=crop",
    likes: 33,
    type: "Residential",
    size: "20x30 sq.ft",
    floors: "G+3",
    area: "59.64L",
    cost: "29.4L",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
    likes: 31,
    type: "Residential",
    size: "30x40 sq.ft",
    floors: "G+2",
    area: "42.57L",
    cost: "31.8L",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    likes: 24,
    type: "Residential",
    size: "30x40 sq.ft",
    floors: "G+3",
    area: "40.31L",
    cost: "35.8L",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1756706718604-ef4af3970e33?auto=format&fit=crop&w=800&q=80",
    likes: 22,
    type: "Residential",
    size: "40x50 sq.ft",
    floors: "G+1",
    area: "30.45L",
    cost: "33.8L",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
    likes: 42,
    type: "Residential",
    size: "40x60 sq.ft",
    floors: "G+1",
    area: "36.30L",
    cost: "28.9L",
  },
];

const FloorPlans = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-orange-100">
      <Navbar />

      {/* Modern Hero Section with Blurry Background */}
      <section className="relative pt-20 pb-12 overflow-hidden bg-white">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 opacity-20 blur-[2px] scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>

        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/10 blur-[120px] rounded-full -mr-20 -mt-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-100/50 blur-[80px] rounded-full -ml-32 -mb-32 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-2xl shadow-xl shadow-slate-900/10 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Architectural Archive</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-none">
              Modern <span className="text-orange-500">Living.</span><br />
              Floor Plan Ledger.
            </h1>

            <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
              Explore our curated selection of architectural blueprints, optimized for contemporary life and structural excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Description / Philosophy */}
      <section className="py-8 bg-white border-y border-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                Welcome to <span className="text-orange-500 font-bold">BuiltPulse&apos;s</span> Design Ecosystem. Discover versatile house plans, precision 3D models, and optimized spatial arrangements tailored for modern India.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setOpenModal(true)}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-900/20"
              >
                Request Custom Plan →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Grid */}
      <section className="py-8 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {floorPlans.map((plan) => (
              <div
                key={plan.id}
                className="group relative bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/40 border border-slate-100 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-500/5 overflow-hidden"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8">
                  <img
                    src={plan.image}
                    alt="Floor Plan"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <p className="text-white text-sm font-medium leading-relaxed max-w-xs">
                      Optimized structural integrity and spatial efficiency for {plan.type.toLowerCase()} deployments.
                    </p>
                  </div>

                  {/* Glass Badges */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="backdrop-blur-md bg-white/30 px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-lg">
                      <span className="text-red-400">❤️</span>
                      <span className="text-white text-[10px] font-black">{plan.likes}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="backdrop-blur-md bg-white/30 px-3 py-1.5 rounded-xl border border-white/20 shadow-lg">
                      <span className="text-white text-[9px] font-black uppercase tracking-widest">{plan.type}</span>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-4 pb-4">
                  <div className="grid grid-cols-2 gap-y-6 mb-10">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Registry Scale</p>
                      <p className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <span className="text-orange-500">📐</span> {plan.size}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Deployment Floor</p>
                      <p className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <span className="text-orange-500">🏠</span> {plan.floors}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Built-up Signal</p>
                      <p className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <span className="text-orange-500">💰</span> {plan.area}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Est. Ledger</p>
                      <p className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <span className="text-orange-500">🧾</span> {plan.cost}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all border border-slate-100"
                    >
                      View Blueprints
                    </button>
                    <button
                      onClick={() => setOpenModal(true)}
                      className="flex-1 py-4 bg-orange-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                    >
                      Initialize Deployment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center pb-8 border-b border-slate-100">
            <button
              onClick={() => setOpenModal(true)}
              className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition"
            >
              LOAD MORE ↓
            </button>
          </div>

          {/* Educational Content Sections */}
          <div className="mt-8 space-y-16">
            {/* What is Floor Plan Design? */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-orange-50 px-4 py-2 rounded-xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-600">Fundamentals</span>
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">What is a <span className="text-orange-500">Floor Plan Design?</span></h2>
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  Floor plan design is the process of drawing a scaled diagram of a building&apos;s layout that displays the placement of its rooms, spaces, and physical elements. It gives you a clear picture of the finished structure and acts as the project&apos;s blueprint. Our cutting-edge house floor plan designs provide a thorough overview of your future area using 2D plans and 3D house design representations.
                </p>
              </div>
              <div className="bg-slate-50 rounded-[3rem] p-8 border border-slate-100">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80" alt="Architectural Plan" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>

            {/* Importance of a Well-Designed House Plan */}
            <section className="bg-white rounded-[3rem] p-8 border border-slate-50 shadow-sm">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Importance of a Well-Designed House Plan</h2>
                  <p className="text-slate-500 font-medium">A well-designed house plan is crucial for the success of your dream home construction project.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Optimizing Space", desc: "Maximizing the use of available space to accommodate the current and future requirements of you and your family." },
                    { title: "Ensuring Functionality", desc: "Creating a logical flow and easy navigation within the structure." },
                    { title: "Long-Term Flexibility", desc: "Considering potential requirements and changes in family size or lifestyle for future expansions." },
                    { title: "Enhancing Aesthetics", desc: "Integrating design elements that enhance the overall appearance and feel of your home." }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-orange-200 transition-colors">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center font-black text-xs mb-4">{i + 1}</div>
                      <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features of Brick & Bolt’s Design */}
            <section className="space-y-10">
              <div className="text-center">
                <h2 className="text-4xl font-black text-slate-900">Features of BuildPulse&apos;s House Floor Plan Design</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] space-y-6">
                  <div className="text-3xl">📐</div>
                  <h3 className="text-xl font-bold">2D House Floor Plans</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Meticulously designed for accuracy and clarity. Includes precise measurements, door/window locations for natural light, and optimal ventilation planning.</p>
                </div>
                <div className="p-8 bg-orange-500 text-white rounded-[2.5rem] space-y-6 shadow-xl shadow-orange-500/20">
                  <div className="text-3xl">🧊</div>
                  <h3 className="text-xl font-bold">3D House Designs</h3>
                  <p className="text-white/80 text-sm leading-relaxed">Realistic 3D renderings that bring your floor plan to life. Lifelike representations of both interior and exterior help you visualize the complete design.</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-6">
                  <div className="text-3xl">📝</div>
                  <h3 className="text-xl font-bold text-slate-900">Detailed Annotations</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Careful annotation of every architectural element to guarantee every detail of the design is clearly communicated and comprehended.</p>
                </div>
              </div>
            </section>

            {/* Types of Our House Plan */}
            <section className="bg-slate-50 rounded-[3rem] p-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl rounded-full -mr-32 -mt-32"></div>
              <div className="relative z-10 space-y-8">
                <h2 className="text-3xl font-black text-slate-900 text-center">Types of Our House Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "Area-Specific Floor Plans",
                    "Custom Square Footage Designs",
                    "Bedroom Configuration Options",
                    "Multi-Floor Layouts",
                    "Orientation and Facing Considerations"
                  ].map((type, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="text-sm font-bold text-slate-700">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-8">
              <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">Why Choose <span className="text-orange-500">BuildPulse</span> for House Design?</h2>
                  <div className="space-y-6">
                    {[
                      { t: "Expertise and Experience", d: "Architects with years of industry experience providing top-notch house plans." },
                      { t: "Digital Tools", d: "Advanced virtualization for accurate measurements and lifelike walkthroughs." },
                      { t: "Customized Solutions", d: "Tailored designs based on your preferences, requirements, and budget." },
                      { t: "Attention to Detail", d: "From wall placement to furniture arrangement, everything is considered." },
                      { t: "Customer-Centric", d: "Direct collaboration and knowledgeable counsel throughout the design phase." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1 text-orange-500 font-black text-xs">✓</div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{item.t}</h4>
                          <p className="text-xs text-slate-500">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                  <h3 className="text-2xl font-black text-slate-900">Design Benefits</h3>
                  <div className="space-y-4">
                    {[
                      { t: "Maximize Land Use", d: "Utilize every inch of your property effectively." },
                      { t: "Ensure Compliance", d: "Adhere to local building codes for smooth approvals." },
                      { t: "Plan Efficiently", d: "Avoid costly mistakes with realistic visualizations." },
                      { t: "Enhance Decision-Making", d: "Make informed choices about your construction." }
                    ].map((benefit, i) => (
                      <div key={i} className="p-4 bg-orange-50 rounded-2xl flex items-center justify-between group hover:bg-orange-500 transition-colors">
                        <span className="text-sm font-bold text-orange-700 group-hover:text-white">{benefit.t}</span>
                        <span className="text-orange-500 group-hover:text-white">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-slate-900 rounded-[3rem] p-10 md:p-14 text-white">
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-black">House Floor Plan FAQ</h2>
                  <p className="text-slate-400 font-medium tracking-widest text-[10px] uppercase">Got Questions? We have Answers.</p>
                </div>
                <div className="space-y-10">
                  {[
                    { q: "What is included in a floor plan design?", a: "A detailed representation of layout showing rooms, areas, and structural elements. Includes precise dimensions, annotations, and specifications for construction." },
                    { q: "How long does it take to design a house plan?", a: "Simple residential plans can take a few days, while more complex layouts might take many weeks depending on complexity and size." },
                    { q: "Can I make changes during the design process?", a: "Yes, we welcome customer input and modifications throughout the design phase to ensure it meets your expectations." },
                    { q: "How much does it cost to design a floor plan?", a: "BuildPulse offers free house floor plans through our design page. Generally, cost varies based on project size and complexity." }
                  ].map((faq, i) => (
                    <div key={i} className="space-y-4 border-b border-white/10 pb-8 last:border-0">
                      <h4 className="text-lg font-bold text-orange-500">Q: {faq.q}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <ConsultPopup
        openModal={openModal}
        setOpenModal={setOpenModal}
        navigate={navigate}
      />
    </div>
  );
};

export default FloorPlans;
