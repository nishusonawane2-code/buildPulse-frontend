import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PackageDetailsGallery = () => {
    const [activeTab, setActiveTab] = useState("Basic");

    const tabs = ["Basic", "Classic", "Premium", "Royale"];

    const content = {
        Basic: [
            {
                title: "Kitchen Details",
                image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800",
                annotations: [
                    { label: "Kitchen Sink", detail: "Stainless Steel single sink", pos: "top-1/2 left-1/4" },
                    { label: "Main Sink Faucet", detail: "ISI Marked", pos: "top-1/3 left-1/2" },
                    { label: "Ceramic Wall Dado", detail: "Upto 2ft height", pos: "top-1/4 right-1/4" }
                ]
            },
            {
                title: "Bathroom Details",
                image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmF0aHJvb218ZW58MHx8MHx8fDA%3D",
                annotations: [
                    { label: "Ceramic Wall Dado", detail: "Upto 7ft height", pos: "top-1/4 left-1/3" },
                    { label: "Sanitaryware & CP Fittings", detail: "Hindware or equivalent", pos: "top-1/2 right-1/3" },
                    { label: "CPVC Pipe", detail: "Astral or equivalent", pos: "bottom-1/4 left-1/2" }
                ]
            },
            {
                title: "Electrical & Painting",
                image: "https://media.istockphoto.com/id/1221306297/photo/man-pours-paint-into-the-tray-and-dips-roller-professional-interior-construction-worker.jpg?s=612x612&w=0&k=20&c=PWolPdRCdlqy3mouV7lLB2-CHEUNzKHNRPrKXW4UR44=",
                annotations: [
                    { label: "Electrical", detail: "Fire proof wires, Anchor Ziva switches", pos: "top-1/3 left-1/4" },
                    { label: "Painting", detail: "Tractor Emulsion for interior", pos: "top-1/2 right-1/4" }
                ]
            }
        ],
        // For now, using similar structure for other tabs, can be customized later
        Classic: [
            {
                title: "Kitchen Details",
                image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
                annotations: [
                    { label: "Main Sink Faucet", detail: "upto Rs 2000", pos: "top-1/3 left-1/2" },
                    { label: "Ceramic Wall Dado", detail: "Upto Rs 100 per sqft", pos: "top-1/4 right-1/4" },
                    { label: "Kitchen Sink", detail: "Stainless steel single sink/hafele", pos: "top-1/2 left-1/4" }
                ]
            },
            {
                title: "Bathroom Details",
                image: "https://images.unsplash.com/photo-1661107259637-4e1c55462428?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhdGhyb29tfGVufDB8fDB8fHww",
                annotations: [
                    { label: "Ceramic Wall Dado", detail: "upto 7ft height - Rs 100/sqft", pos: "top-1/4 left-1/3" },
                    { label: "Sanitaryware & CP Fittings", detail: "Parryware make", pos: "top-1/2 right-1/3" },
                    { label: "CPVC Pipe", detail: "Ashirvad or Supreme", pos: "bottom-1/4 left-1/2" },
                    { label: "Bathroom doors", detail: "Waterproof flush doors or WPC", pos: "bottom-1/3 right-1/4" }
                ]
            },
            {
                title: "Electrical & Painting",
                image: "https://media.istockphoto.com/id/477232740/photo/painting-house.jpg?s=612x612&w=0&k=20&c=yINVWZyW6PMC7_AT_jqAlMcSOqUFFG9jk37jJraZ28s=",
                annotations: [
                    { label: "Electrical", detail: "Finolex, Polycab or equivalent", pos: "top-1/3 left-1/4" },
                    { label: "Switches & Sockets", detail: "Anchor Roma Classic", pos: "top-1/4 right-1/3" },
                    { label: "Painting", detail: "JK Putty + Tractor Shyne Emulsion", pos: "top-1/2 left-1/3" },
                    { label: "Exterior Painting", detail: "Asian Primer + Apex Exterior", pos: "bottom-1/3 right-1/4" }
                ]
            }
        ],
        Premium: [
            {
                title: "Kitchen Details",
                image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=800",
                annotations: [
                    { label: "Main Sink Faucet", detail: "upto Rs 2200, Jaguar or Cera", pos: "top-1/3 left-1/2" },
                    { label: "Ceramic Wall Dado", detail: "Upto Rs 120 per sqft", pos: "top-1/4 right-1/4" },
                    { label: "Kitchen Sink", detail: "Granite finish or equivalent", pos: "top-1/2 left-1/4" }
                ]
            },
            {
                title: "Bathroom Details",
                image: "https://media.istockphoto.com/id/2002633565/photo/contemporary-tranquility-3d-bathroom-tile-design-for-modern-living.webp?a=1&b=1&s=612x612&w=0&k=20&c=0l9LKCIPmNFB4iWaFkVmpnTU7Fik1Pj4MFtj5QWMLWU=",
                annotations: [
                    { label: "Ceramic Wall Dado", detail: "upto 7ft height - upto Rs 120/sqft", pos: "top-1/4 left-1/3" },
                    { label: "Sanitaryware & CP Fittings", detail: "Jaguar or Cera make", pos: "top-1/2 right-1/3" },
                    { label: "CPVC Pipe", detail: "Ashirvad or Supreme", pos: "bottom-1/4 left-1/2" }
                ]
            },
            {
                title: "Electrical & Painting",
                image: "https://media.istockphoto.com/id/503457156/photo/painting-wall-in-gray.jpg?s=612x612&w=0&k=20&c=ecqaP_WE0VtsgzLoldzxtE4V2usk4XFVII9KCse2Zb0=",
                annotations: [
                    { label: "Electrical", detail: "Fire proof wires, Anchor Roma switches", pos: "top-1/3 left-1/4" },
                    { label: "Painting", detail: "JK Putty + Premium Emulsion", pos: "top-1/2 right-1/4" }
                ]
            }
        ],
        Royale: [
            {
                title: "Kitchen Details",
                image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D",
                annotations: [
                    { label: "Main Sink Faucet", detail: "upto Rs 2500, ISI Marked", pos: "top-1/3 left-1/2" },
                    { label: "Ceramic Wall Dado", detail: "Upto Rs 150 per sqft", pos: "top-1/4 right-1/4" },
                    { label: "Kitchen Sink", detail: "Stainless steel or granite finish worth Rs 8,000", pos: "top-1/2 left-1/4" }
                ]
            },
            {
                title: "Bathroom Details",
                image: "https://images.unsplash.com/photo-1603825491103-bd638b1873b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJhdGhyb29tfGVufDB8fDB8fHww",
                annotations: [
                    { label: "Ceramic Wall Dado", detail: "upto 7ft height - upto Rs 150/sqft", pos: "top-1/4 left-1/3" },
                    { label: "Sanitaryware & CP Fittings", detail: "upto Rs 50,000 per 1000 sqft (Kohler)", pos: "top-1/2 right-1/3" },
                    { label: "CPVC Pipe", detail: "Ashirvad or Supreme", pos: "bottom-1/4 left-1/2" },
                    { label: "Bathroom doors", detail: "Waterproof Flush doors or WPC", pos: "bottom-1/3 right-1/4" },
                    { label: "Accessories", detail: "Mirror, Towel Rail - worth Rs 5000", pos: "bottom-1/2 left-1/4" }
                ]
            },
            {
                title: "Electrical & Painting",
                image: "https://media.istockphoto.com/id/932230962/photo/house-painting.jpg?s=612x612&w=0&k=20&c=sMf3wkAUwpf2vrrflytX0p4oXhn79bUX7D3mVBjbLAk=",
                annotations: [
                    { label: "Inner Painting", detail: "JK Putty + Royale Luxury Emulsion", pos: "top-1/3 left-1/2" },
                    { label: "Exterior Painting", detail: "Asian Paints + Apex Ultima", pos: "top-1/2 left-1/4" },
                    { label: "Switches & Sockets", detail: "Legrand Myrius / GM Modular", pos: "bottom-1/3 right-1/4" },
                    { label: "EV Charging", detail: "Point at Ground Floor", pos: "bottom-1/4 left-1/3" }
                ]
            }
        ]
    };

    // Fallback for empty tabs to show basic content for demo
    const displayContent = content[activeTab].length > 0 ? content[activeTab] : content["Basic"];

    return (
        <section className="pt-12 pb-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 max-w-2xl leading-tight">
                        Take a Closer Look at <span className="text-orange-500">BuiltPulse</span> Construction Company offerings
                    </h2>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {displayContent.map((item, index) => (
                        <div key={index} className="relative group rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                            {/* Annotations */}
                            {item.annotations.map((ann, aIndex) => (
                                <div
                                    key={aIndex}
                                    className={`absolute ${ann.pos} flex flex-col items-center group/ann`}
                                >
                                    <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] relative z-10">
                                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                                    </div>
                                    <div className="mt-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <p className="text-[10px] font-bold text-gray-900 whitespace-nowrap uppercase tracking-wider">{ann.label}</p>
                                        <p className="text-[10px] text-gray-500 whitespace-nowrap">{ann.detail}</p>
                                    </div>
                                    {/* Decorative line mockup */}
                                    <div className="w-px h-8 bg-gradient-to-b from-white to-transparent -mt-1 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            ))}

                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-white font-bold text-xl drop-shadow-md">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex justify-center">
                    <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl shadow-inner">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab
                                    ? "bg-white text-gray-900 shadow-md transform scale-105"
                                    : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PackageDetailsGallery;
