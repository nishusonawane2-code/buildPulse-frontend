import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";

const ConstructionPackages = () => {
    const [selectedCity, setSelectedCity] = useState("Pune");

    const packages = [
        {
            name: "Basic",
            price: "1600",
            description: "A budget package with no compromise on quality that includes all construction essentials",
            highlights: [
                "Trusted brand steel & cement",
                "Standard floor tiles upto ₹50/sqft",
                "Standard flush doors and window finish",
                "Tractor Emulsion finish",
                "Essential kitchen & bathroom fittings"
            ],
            brands: ["SUNVIK", "Dalmia", "AP", "CERA"],
            popular: false
        },
        {
            name: "Classic",
            price: "1740",
            description: "Our best seller package with upgraded brands like Jindal Steels, Hindware etc at a considerable price",
            highlights: [
                "Superior brand steel & cement",
                "Refined floor tiles upto ₹100/sqft",
                "Elegant teak doors and window finish",
                "Tractor Shyne Emulsion finish",
                "Stylish kitchen & bathroom"
            ],
            brands: ["Jindal", "Dalmia", "AP", "Hindware"],
            popular: true
        },
        {
            name: "Premium",
            price: "1990",
            description: "An elegant package crafted for modern living with extra provisions like solar heater setup, puja room door etc",
            highlights: [
                "Superior Brand steel & cement",
                "Premium floor tiles upto ₹140/sqft",
                "Designer teak doors and window finish",
                "Apcolite Premium finish",
                "Quality kitchen & bathroom"
            ],
            brands: ["Jindal", "Ultratech", "AP", "Jaquar"],
            popular: false
        },
        {
            name: "Royale",
            price: "2140",
            description: "An ultimate plan with high-end finishes with amenities like EV charging, copper gas connection etc",
            highlights: [
                "Superior brand steel & cement",
                "Lavish floor tiles upto ₹160/sqft",
                "Designer teak doors and window finish",
                "Apex Ultima Exterior finish",
                "Lavish Fittings for kitchen & bathroom"
            ],
            brands: ["Jindal", "Ultratech", "AP", "KOHLER"],
            popular: false
        }
    ];

    return (
        <section className="pt-20 pb-12 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header Section */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                        Construction Packages in <span className="text-orange-500">{selectedCity}</span>
                    </h2>

                    <div className="flex flex-wrap items-center gap-8">
                        {/* City Dropdown Mockup */}
                        <div className="relative">
                            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm font-medium text-gray-700">
                                {selectedCity} <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 flex flex-col items-stretch h-full ${pkg.popular ? "border-orange-400 shadow-2xl scale-105 z-10" : "border-gray-100 shadow-lg hover:shadow-xl"}`}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-[10px] font-bold uppercase tracking-widest text-center py-1 rounded-t-2xl">
                                    Popular
                                </div>
                            )}

                            <div className="mb-6 pt-2">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                                <div className="text-xl font-bold text-gray-800 flex items-baseline gap-1">
                                    ₹{pkg.price} <span className="text-sm font-normal text-gray-500">per sqft</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                {pkg.description}
                            </p>

                            <div className="mb-8">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    Highlights <Info className="w-3 h-3" />
                                </h4>
                                <ul className="space-y-3">
                                    {pkg.highlights.map((highlight, hIndex) => (
                                        <li key={hIndex} className="flex gap-3 text-sm text-gray-700 font-medium leading-normal">
                                            <span className="text-orange-500 mt-1">•</span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto space-y-6">
                                <button className="w-full py-3 rounded-lg border border-orange-200 text-orange-600 font-bold text-sm hover:bg-orange-50 transition-colors">
                                    Learn More
                                </button>

                                {/* Brand Logos Mockup */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    {pkg.brands.map((brand, bIndex) => (
                                        <div key={bIndex} className="text-[10px] font-black text-gray-300 uppercase italic">
                                            {brand.substring(0, 6)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConstructionPackages;
