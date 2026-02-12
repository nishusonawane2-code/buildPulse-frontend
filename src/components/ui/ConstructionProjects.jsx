import React from "react";

const ConstructionProjects = () => {
    const projects = [
        {
            title: "Comfort Meets Class",
            crn: "CRN 44418",
            image: "https://5.imimg.com/data5/BK/WO/SL/SELLER-33343279/small-duplex-house-elevation.jpg",
        },
        {
            title: "Modern Design. Homely Feel",
            crn: "CRN 135074",
            image: "https://www.tostemindia.com/wp-content/uploads/2024/12/Urban-Contemporary-Bungalow-Design.jpg",
        },
        {
            title: "Elegant Outside. Warm Inside",
            crn: "CRN 395815",
            image: "https://assets-news.housing.com/news/wp-content/uploads/2022/12/25065525/image1-66.png",
        },
    ];

    return (
        <section className="pt-12 pb-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Construction Projects in Pune
                    </h2>
                    <p className="text-gray-600 max-w-2xl text-lg">
                        Built with precision, quality, and trust, ensuring your dream home is
                        crafted to perfection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <div key={index} className="flex flex-col group">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                                    {project.title}
                                </h3>
                            </div>
                            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] mb-4">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-500 tracking-wider">
                                    {project.crn}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConstructionProjects;
