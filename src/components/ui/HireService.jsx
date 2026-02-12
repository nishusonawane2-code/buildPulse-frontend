import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CheckCircle2, IndianRupee, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import ConsultPopup from '../../views/ConsultPopUp';

const HireService = () => {
    const [openModal, setOpenModal] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const navigate = useNavigate();

    const services = [
        {
            title: "Independent house Construction in Pune",
            description: "Collaborate with the top construction company in Pune and enjoy living in your own home. Keeping your needs and lifestyle in mind, our creative team builds unique, individual homes. We make sure that every element accurately captures your unique vision from start to finish."
        },
        {
            title: "Bungalow Construction in Pune",
            description: "Work together with the best construction company in Pune to live in ultimate luxury. Our team is skilled at designing spacious, opulent bungalows that will surpass your expectations."
        },
        {
            title: "Villa Construction in Pune",
            description: "Our villa construction services in Pune can improve your standard of living. Our competent team designs opulent villas according to your tastes and way of life. Our skilled workmanship and meticulous attention to detail deliver the ultimate in comfort and elegance."
        },
        {
            title: "Farmhouse Construction in Pune",
            description: "Built & Pulse's farmhouse construction service offers the charm of the countryside. Our team crafts serene havens that efficiently combine comfort and environment. Let us design your ideal rural getaway so you can live a tranquil life just outside the city."
        },
        {
            title: "Duplex Construction in Pune",
            description: "Our professionals build modern duplex homes that satisfy your needs and are functional. As Pune' leading building construction company, give us the opportunity to expertly and seamlessly turn your idea into a reality."
        },
        {
            title: "Custom House Construction in Pune",
            description: "Built & Pulse is the best option for custom house building in Pune. We will make it easy for you to design the house of your dreams in your own distinctive style. Every step of the way, from design to finishing touches, our knowledgeable team ensures quality."
        }
    ];

    const faqs = [
        {
            q: "Which is the most reliable construction company in Pune?",
            a: "Built & Pulse is a leading Pune construction company known for dependable delivery, 470+ on‑site quality checks, transparent pricing, and 10‑year structural warranty, making it a top choice for reliable residential and commercial builds."
        },
        {
            q: "What’s the average house construction cost in Pune?",
            a: "Average house construction cost in Pune is ₹1,800 - ₹2,500 per sq. ft., depending on materials, finish level, design complexity, and site conditions. For a precise estimate, use our free construction cost calculator or request a detailed project quote."
        },
        {
            q: "Do you construct bungalows and villas?",
            a: "Yes. Built & Pulse builds villas, bungalows, duplexes, and independent homes with end‑to‑end services including design and 3D elevations, statutory approvals, structural and MEP execution, interiors, landscaping, and final handover with a 10‑year structural warranty."
        },
        {
            q: "Can Built & Pulse help with PMC or PCMC approvals?",
            a: "Yes. Built & Pulse assists in securing all civic permissions from PMC and PCMC, managing the approvals process end to end."
        },
        {
            q: "Do you provide 3D elevation visualization?",
            a: "Yes. Built & Pulse provides 3D elevation visualisations so you can review façade treatments, materials, colours, and lighting before construction begins. Request a 3D design review to see your elevation in realistic detail."
        },
        {
            q: "How does Built & Pulse ensure quality control?",
            a: "Built & Pulse enforces strict quality control through QASCON audits, engineer supervision, and digital verification to deliver consistent, compliant builds. Engineer supervision and site managers for daily checks and sign-offs. 470+ on-site quality checks covering materials, structural works, MEP, and finishes. Material verification and testing with certified suppliers and third‑party lab checks. Real-time documentation via the Built & Pulse app: timestamped photos, inspection reports, and deviation logs. Final inspection and warranty with a 10‑year structural warranty."
        },
        {
            q: "What are your payment terms?",
            a: "Stage‑based Escrow payments tied to construction milestones; funds are released after engineers sign‑off and timestamped photo verification. Retention is held until final handover and warranty activation."
        },
        {
            q: "How long does a project usually take?",
            a: "Typical timeline: a standard 2‑floor home is completed in 8 - 9 months under normal site and approval conditions. Factors: design complexity, approvals, weather, material availability, and custom finishes. For an exact timeline, request a site assessment for a detailed, milestone‑based schedule."
        },
        {
            q: "Are floor plans customizable?",
            a: "Yes. Choose from 14,000+ pre‑approved floor plans or get a fully custom layout tailored to your plot, lifestyle, and budget. Options include room size changes, orientation, Vastu, structural edits, and MEP integration, with 3D elevations and approval‑ready drawings provided."
        },
        {
            q: "Why choose Built & Pulse as your construction company in Pune?",
            a: "Transparent pricing, reliable on‑time delivery, and superior engineering backed by 470+ quality checks and a 10‑year structural warranty."
        }
    ];

    const toggleFaq = (idx) => {
        setExpandedFaq(expandedFaq === idx ? null : idx);
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Main Hero Card */}
                <div className="bg-[#FFF8F6] rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 mb-24">
                    {/* Left Content */}
                    <div className="flex-1 relative z-10 w-full text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight mb-12">
                            Hire the best house <br className="hidden md:block" /> construction service
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="flex flex-col items-center lg:items-start gap-3">
                                <div className="flex items-center gap-2">
                                    <Home className="w-6 h-6 text-[#F05A28]" />
                                    <span className="text-2xl font-bold text-[#F05A28]">10,000+</span>
                                </div>
                                <p className="text-gray-600 font-medium">Homes</p>
                            </div>

                            <div className="flex flex-col items-center lg:items-start gap-3 md:border-l md:border-gray-200 md:pl-8">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-6 h-6 text-[#F05A28]" />
                                    <span className="text-2xl font-bold text-[#F05A28]">470+</span>
                                </div>
                                <p className="text-gray-600 font-medium">Quality Checks</p>
                            </div>

                            <div className="flex flex-col items-center lg:items-start gap-3 md:border-l md:border-gray-200 md:pl-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#F05A28] flex items-center justify-center text-white text-xs font-bold">₹</div>
                                    <span className="text-2xl font-bold text-[#F05A28]">100%</span>
                                </div>
                                <p className="text-gray-600 font-medium whitespace-nowrap">Safe Money Transaction</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setOpenModal(true)}
                            className="px-10 py-5 bg-[#F05A28] text-white rounded-2xl text-lg font-bold hover:bg-[#D9481E] transition-all transform active:scale-95 shadow-lg shadow-orange-500/20"
                        >
                            Let's Build
                        </button>
                    </div>

                    {/* Right Illustration */}
                    <div className="flex-1 w-full max-w-2xl">
                        <svg
                            viewBox="0 0 800 400"
                            className="w-full h-auto"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Background Circles */}
                            <circle cx="150" cy="250" r="60" fill="#F5EEEB" />
                            <circle cx="450" cy="220" r="100" fill="#F5EEEB" />
                            <circle cx="750" cy="200" r="80" fill="#F5EEEB" />

                            {/* Grey Trees */}
                            {[420, 680].map((x, i) => (
                                <g key={i} transform={`translate(${x}, 50)`}>
                                    <path
                                        d="M60 0C60 0 120 100 120 180C120 260 60 280 60 280C60 280 0 260 0 180C0 100 60 0 60 0Z"
                                        fill="#F0ECE9"
                                    />
                                    <rect x="58" y="150" width="4" height="130" fill="#2D1A12" />
                                    {[180, 200, 220].map((y, j) => (
                                        <g key={j}>
                                            <path d={`M60 ${y}L85 ${y + 25}`} stroke="#2D1A12" strokeWidth="2" />
                                            <path d={`M60 ${y}L35 ${y + 25}`} stroke="#2D1A12" strokeWidth="2" />
                                        </g>
                                    ))}
                                </g>
                            ))}

                            {/* Houses */}
                            {[100, 350, 600].map((x, i) => (
                                <g key={i} transform={`translate(${x}, 240)`}>
                                    {/* Main body */}
                                    <rect x="0" y="45" width="170" height="95" fill="#EBEBEB" />
                                    <rect x="140" y="45" width="70" height="95" fill="#D6D6D6" />

                                    {/* FIXED Roof */}
                                    <path
                                        d="M-30 45 L85 0 L210 45 Z"
                                        fill="#2D1A12"
                                    />

                                    {/* Chimney */}
                                    <rect x="165" y="10" width="18" height="35" fill="#D6D6D6" />

                                    {/* Windows */}
                                    {[15, 40].map((wx, wi) =>
                                        [75, 100].map((wy, wj) => (
                                            <rect key={`${wi}-${wj}`} x={wx} y={wy} width="15" height="15" fill="#2D1A12" />
                                        ))
                                    )}

                                    {/* Door */}
                                    <rect x="75" y="75" width="25" height="65" fill="#D6D6D6" />

                                    {/* Big window */}
                                    <rect x="110" y="78" width="35" height="28" fill="#2D1A12" />

                                    {/* Right windows */}
                                    {[175, 200].map((wx, wi) =>
                                        [75, 100].map((wy, wj) => (
                                            <rect key={`${wi}-${wj}`} x={wx} y={wy} width="15" height="15" fill="#2D1A12" />
                                        ))
                                    )}
                                </g>
                            ))}

                            {/* Orange Trees */}
                            {[310, 335, 560].map((x, i) => (
                                <g key={i} transform={`translate(${x}, 310)`}>
                                    <path
                                        d="M12 0C12 0 24 25 24 45C24 65 12 75 12 75C12 75 0 65 0 45C0 25 12 0 12 0Z"
                                        fill="#FF5722"
                                    />
                                    <rect x="11" y="60" width="2" height="30" fill="#2D1A12" />
                                </g>
                            ))}

                            {/* Small bush */}
                            <g transform="translate(70, 360)">
                                <path
                                    d="M10 0C10 0 20 15 20 25C20 35 10 40 10 40C10 40 0 35 0 25C0 15 10 0 10 0Z"
                                    fill="#FF5722"
                                />
                                <rect x="9" y="30" width="2" height="10" fill="#2D1A12" />
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Service Types Grid */}
                <div className="mb-24 px-4">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-12 text-center lg:text-left">
                        Types of House Construction Services in Pune
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-300">
                                <h4 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Residential Solutions */}
                <div className="mb-24 px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-4">
                                Comprehensive Residential Solutions in Pune
                            </h3>
                            <h4 className="text-xl font-bold text-gray-800 mb-4">
                                Building Materials Supply for House Construction in Pune
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                At Built & Pulse, we understand how crucial it is to build with premium materials. For this reason, we provide a wide range of high-quality building materials to guarantee the longevity and robustness of your home.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-4">
                                Customer-Centric Approach for House Construction in Pune
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                Our primary goal is to ensure your satisfaction. Our team is committed to providing a customer-centric experience and is always available to solve any issues or problems you may have. Your experience with Built & Pulse is distinguished by expertise, reliability, and a commitment to meeting your needs.
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
                        <h3 className="text-3xl font-extrabold mb-6">Hire the Best Construction Company in Pune</h3>
                        <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                            Select Built & Pulse for your building project, and start a journey where quality, creativity, and a never-ending commitment to excellence help your dream home come to life.
                        </p>
                        <button
                            onClick={() => setOpenModal(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all self-start"
                        >
                            Contact us right now →
                        </button>
                    </div>
                </div>

                {/* FAQs Section */}
                <div className="px-4">
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
                        FAQs on Construction Company in Pune
                    </h3>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-slate-100 rounded-3xl bg-white overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors group"
                                >
                                    <span className="font-bold text-gray-900 pr-8 group-hover:text-[#F05A28] transition-colors">{faq.q}</span>
                                    {expandedFaq === idx ? (
                                        <div className="bg-orange-500 p-2 rounded-full text-white">
                                            <ChevronUp className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        <div className="bg-slate-100 p-2 rounded-full text-gray-400">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    )}
                                </button>
                                {expandedFaq === idx && (
                                    <div className="p-6 pt-0 bg-white border-t border-slate-50">
                                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                            {faq.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ConsultPopup
                openModal={openModal}
                setOpenModal={setOpenModal}
                navigate={navigate}
            />
        </section>
    );
};

export default HireService;
