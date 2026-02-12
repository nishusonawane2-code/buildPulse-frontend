
import Quality from "../assets/icon/quality.svg"
import Money from "../assets/icon/money.svg"
import transparency from "../assets/icon/transparency.svg"
import delay from "../assets/icon/delay.svg"

const features = [
  {
    title: "Safe Money Transaction",
    description:
      "No Advance. Contractor is paid only once the work is complete",
    icon: Money,
  },
  {
    title: "Absolute Transparency",
    description:
      "Clear and Detailed Quotation. Online tracking of projects",
    icon: transparency,
  },
  {
    title: "Assured Quality Control",
    description:
      "470+ Quality (QASCON) Checks performed by team of experts",
    icon: Quality,
  },
  {
    title: "Zero Delays",
    description: "Zero tolerance for delays",
    icon: delay,
  },
];

const WhyBP = () => {

  return (
    <section className="w-full bg-gradient-to-b from-white to-orange-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Why Built &amp; Pulse?
        </h2>

        <p className="mt-4 text-lg text-gray-600 max-w-3xl leading-relaxed">
          We ensure peace of mind, trust, and transparent house construction
          services.
        </p>

        {/* Cards */}
        <div className="flex gap-5 mt-10 items-center flex-wrap w-screen">
          {features.map((item, index) => (
            <div key={index} className="">
              <div className="w-[300px] h-[380px] rounded-3xl overflow-hidden shadow-lg bg-white transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-200/50 group">
                {/* Image */}
                <div
                  className="relative h-[220px] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage:
                      `url(${item.icon})`
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h2 className="text-lg font-semibold group-hover:text-orange-500 transition-colors duration-300">{item.title}</h2>

                  <p className="text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBP;

