import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import step1Image from "../../assets/how_it_works_step1.jpg";
import step2Image from "../../assets/how_it_works_step2.jpg";
import step3Image from "../../assets/how_it_works_step3.jpg";
import step4Image from "../../assets/how_it_works_step4.jpg";
import step5Image from "../../assets/how_it_works_step5.jpg";
import step6Image from "../../assets/how_it_works_step6.jpg";
import step7Image from "../../assets/how_it_works_step7.jpg";

const HowItWorks = () => {
    const scrollContainerRef = useRef(null);

    const baseSteps = [
        {
            number: "01",
            description: "Fill out a short form and our team will call you within 20 minutes to begin.",
            image: step1Image,
            bgClass: "bg-gradient-to-b from-[#1C1C1C] to-[#2D1612]"
        },
        {
            number: "02",
            description: "Meet our technical expert and architect to discuss your needs and receive an initial quotation.",
            image: step2Image,
            bgClass: "bg-[#0A0A0A]"
        },
        {
            number: "03",
            description: "Pay a small token to confirm your booking and start pre-construction work.",
            image: step3Image,
            bgClass: "bg-gradient-to-b from-[#0A0A0A] to-[#1a1a1a]"
        },
        {
            number: "04",
            description: "We survey your site, run tests, and create drawings and 3D models for your review.",
            image: step4Image,
            bgClass: "bg-[#0A0A0A]"
        },
        {
            number: "05",
            description: "Sign a transparent contract with clear timelines and milestone-based payments.",
            image: step5Image,
            bgClass: "bg-[#0A0A0A]"
        },
        {
            number: "06",
            description: "Construction begins with daily quality checks and full progress tracking on our app.",
            image: step6Image,
            bgClass: "bg-[#0A0A0A]"
        },
        {
            number: "07",
            description: "After final checks, your home is handed over with a 10-year warranty.",
            image: step7Image,
            bgClass: "bg-gradient-to-b from-[#0A0A0A] to-[#2d2812]"
        }
    ];

    // Triple the steps for infinite scrolling effect
    const stepsArr = [...baseSteps, ...baseSteps, ...baseSteps];

    useEffect(() => {
        // Start at the middle set of items
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const singleSetWidth = container.scrollWidth / 3;
            container.scrollLeft = singleSetWidth;
        }
    }, []);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const singleSetWidth = container.scrollWidth / 3;

            // Silently reset scroll to middle section when reaching boundaries
            if (container.scrollLeft <= 5) {
                container.scrollLeft = singleSetWidth + 5;
            } else if (container.scrollLeft >= singleSetWidth * 2 - 5) {
                container.scrollLeft = singleSetWidth - 5;
            }
        }
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current: container } = scrollContainerRef;
            const scrollAmount = container.offsetWidth;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="pt-12 pb-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-12 border-b border-gray-100 pb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        How It Works
                    </h2>
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Steps Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {stepsArr.map((step, index) => (
                        <div
                            key={index}
                            className="rounded-3xl overflow-hidden flex flex-col h-[520px] w-full min-w-[280px] md:w-[calc((100%-3rem)/3)] relative group hover:shadow-2xl transition-all duration-500 flex-shrink-0"
                        >
                            {/* Background Image */}
                            <img
                                src={step.image}
                                alt={`Step ${step.number}`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Dark Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

                            {/* Content */}
                            <div className="relative z-10 p-10 h-full flex flex-col">
                                <span className="text-6xl font-bold text-white/20 mb-6 block group-hover:text-orange-500/40 transition-colors">
                                    {step.number}
                                </span>
                                <p className="text-white text-xl leading-relaxed font-semibold">
                                    {step.description}
                                </p>

                                {step.number === "03" && (
                                    <div className="mt-6 self-start bg-white/10 backdrop-blur-md rounded-xl p-3 shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500 border border-white/20">
                                        <div className="grid grid-cols-3 gap-1">
                                            {[...Array(9)].map((_, i) => (
                                                <div key={i} className={`w-2 h-2 rounded-full ${i === 4 ? 'bg-orange-500' : 'bg-white/30'}`}></div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Decorative Border on Hover */}
                            <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/30 transition-all duration-500 rounded-3xl pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
};

export default HowItWorks;
