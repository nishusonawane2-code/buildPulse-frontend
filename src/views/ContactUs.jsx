// import React from 'react'
// import Navbar from '../components/Navbar'

// const ContactUs = () => {
//   return (
//     <div>
//       <Navbar/>
//     <div className="w-full bg-white text-gray-800">
//       {/* Hero */}
//       <div className="relative h-[320px] w-full">
//         <img
//           src="/hero.jpg"
//           alt="Contact"
//           className="h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
//           <h1 className="text-4xl font-bold">Contact Us</h1>
//           <p className="mt-2 text-sm">Willbuild Sites &gt; Willbuild Demo &gt; Contact Us</p>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
//         {/* Left */}
//         <div className="space-y-8">
//           <div>
//             <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
//             <p className="text-gray-500">Book your appointment with us to Willbuild your design journey.</p>
//           </div>
//           <div>
//             <p className="font-semibold">Call us on</p>
//             <p className="text-orange-500">Talk to us and see how we can work together: +91-95117 56100</p>
//           </div>
//           <div>
//             <p className="font-semibold">Your message</p>
//             <p className="text-gray-500">We're usually replying within 24 hours</p>
//             <p className="text-gray-500">info-reply@builtpulse.com</p>
//           </div>
//           <div>
//             <p className="font-semibold">Your Location</p>
//             <p className="text-gray-500">Soygaon, Malegaon, Dist-Nashik, Maharashtra</p>
//           </div>
//         </div>

//         {/* Right */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
//           <form className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input className="border rounded-md p-3" placeholder="Name" />
//               <input className="border rounded-md p-3" placeholder="Email" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input className="border rounded-md p-3" placeholder="Phone" />
//               <input className="border rounded-md p-3" placeholder="Subject" />
//             </div>
//             <textarea
//               className="border rounded-md p-3 w-full h-28"
//               placeholder="How can we help you? Feel free to get in touch"
//             />
//             <div className="flex items-center gap-2 text-sm">
//               <input type="checkbox" />
//               <span>I agree with your terms and conditions</span>
//             </div>
//             <button className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition">
//               Get Started →
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Map */}
//       <div className="w-full h-[420px]">
//         <iframe
//           title="map"
//           className="w-full h-full"
//           src="https://www.google.com/maps?q=HG34+W68,+Open+Place,+Siddhivinayak+Nagar,+Soygaon,+Malegaon,+Maharashtra+423203,+India&output=embed"
//           loading="lazy"
//         />
//       </div>

//       {/* Info Section */}
//       <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
//         <div>
//           <span className="text-orange-500 uppercase text-sm">About</span>
//           <h2 className="text-3xl font-semibold mt-2 mb-4">Committed to high quality Construction services</h2>
//           <p className="text-gray-500 mb-6">
//             With over a decade of dedicated experience in the construction industry, we deliver high-quality,
//              reliable, and modern building solutions tailored to your needs. From the first blueprint to the final build, our expert team combines precision craftsmanship with innovative techniques to ensure every project is completed on schedule and to the highest standards. We are proud of our legacy of excellence and committed to building structures that stand strong today and for years to come.
//           </p>
//           <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-md hover:bg-orange-500 hover:text-white transition">
//             Read More
//           </button>
//         </div>

//         {/* question */}
//         <div className="space-y-4">
//           {[1, 2, 3, 4].map((item) => (
//             <div key={item} className="border rounded-md p-4 flex justify-between items-center">
//               <p className="font-medium">{item}. How to process your site for construction?</p>
//               <span className="text-orange-500">+</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer CTA */}
//       <div className="bg-orange-500 text-white py-16 text-center">
//         <h2 className="text-3xl font-semibold mb-4">Lets build something great.</h2>
//         <p className="mb-6">Book an appointment and discuss about your project today.</p>
//         <button className="bg-white text-orange-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
//           Get Started
//         </button>
//       </div>
//     </div>

//     </div>
//   );
// }
// export default ContactUs;


import React, { useState } from 'react'
import axiosClient from '../api/axiosClient'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import img from '../assets/icon/background2.jpg'

const ContactUs = () => {
  const navigate = useNavigate();

  // ✅ REQUIRED STATE
  const [openIndex, setOpenIndex] = useState(0)
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosClient.post("/inquiries", form);

      if (response.status === 200 || response.status === 201) {
        toast.success("Thank you! Your message has been sent successfully.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => navigate("/thank-you"), 1500);
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full bg-white text-gray-800">
        {/* Hero */}
        <div className="relative h-[320px] w-full">
          <img
            src={img}
            alt="Contact"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-2 text-sm">Willbuild Sites &gt; Willbuild Demo &gt; Contact Us</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Get in Touch</h2>
              <p className="text-gray-500">Book your appointment with us to Willbuild your design journey.</p>
            </div>
            <div>
              <p className="font-semibold">Call us on</p>
              <p className="text-orange-500">Talk to us and see how we can work together: +91-95117 56100</p>
            </div>
            <div>
              <p className="font-semibold">Your message</p>
              <p className="text-gray-500">We're usually replying within 24 hours</p>
              <p className="text-gray-500">info-reply@builtpulse.com</p>
            </div>
            <div>
              <p className="font-semibold">Your Location</p>
              <p className="text-gray-500">Soygaon, Malegaon, Dist-Nashik, Maharashtra</p>
            </div>
          </div>

          {/* Right */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border rounded-md p-3"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={loading}
                />
                <input
                  className="border rounded-md p-3"
                  placeholder="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border rounded-md p-3"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  disabled={loading}
                />
                <input
                  className="border rounded-md p-3"
                  placeholder="Subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  disabled={loading}
                />
              </div>
              <textarea
                className="border rounded-md p-3 w-full h-28"
                placeholder="How can we help you? Feel free to get in touch"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                disabled={loading}
              />
              <div className="flex items-center gap-2 text-sm">
                <input type="checkbox" required disabled={loading} />
                <span>
                  I agree with your terms and conditions and{" "}
                  <Link to="/privacy-policy" className="text-orange-500 underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition disabled:bg-orange-300"
              >
                {loading ? "Sending..." : "Get Started →"}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[420px]">
          <iframe
            title="map"
            className="w-full h-full"
            src="https://www.google.com/maps?q=HG34+W68,+Open+Place,+Siddhivinayak+Nagar,+Soygaon,+Malegaon,+Maharashtra+423203,+India&output=embed"
            loading="lazy"
          />
        </div>

        {/* Info Section */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <span className="text-orange-500 uppercase text-sm">About</span>
            <h2 className="text-3xl font-semibold mt-2 mb-4">Committed to high quality Construction services</h2>
            <p className="text-gray-500 mb-6">
              With over a decade of dedicated experience in the construction industry, we deliver high-quality,
              reliable, and modern building solutions tailored to your needs. From the first blueprint to the final build, our expert team combines precision craftsmanship with innovative techniques to ensure every project is completed on schedule and to the highest standards. We are proud of our legacy of excellence and committed to building structures that stand strong today and for years to come.
            </p>
            <button className="border border-orange-500 text-orange-500 px-6 py-3 rounded-md hover:bg-orange-500 hover:text-white transition">
              Read More
            </button>
          </div>

          {/* question – UPDATED ONLY */}
          <div className="space-y-4">
            {[
              {
                q: "How to process your site for construction?",
                a: "You prepare a site by surveying and assessing the land, clearing vegetation/debris, testing the soil, and planning utilities before starting construction to ensure the ground is safe and ready for building.",
              },
              {
                q: "What are the charges of renovation?",
                a: "Renovation charges depend on site condition, scope of work, quality of materials, and labour costs, varying widely by project size and complexity.",
              },
              {
                q: "Benefits of choosing our services?",
                a: "We provide quality construction, timely delivery, and expert supervision,Choosing our services ensures quality workmanship, timely completion, and professional guidance that helps avoid common renovation pitfalls.",
              },
              {
                q: "How to contact with our support team?",
                a: "You can contact us via phone, email, or the contact form on this page.You can reach our support team by phone, email, or through the contact form on this page for quick assistance.",
              },
            ].map((item, index) => (
              <div key={index} className="border rounded-md p-4">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <p className={`font-medium ${openIndex === index ? "text-orange-500" : ""}`}>
                    {index + 1}. {item.q}
                  </p>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <p className="mt-4 text-gray-500 text-sm leading-relaxed">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-orange-500 text-white py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">Lets build something great.</h2>
          <p className="mb-6">Book an appointment and discuss about your project today.</p>
          <button className="bg-white text-orange-500 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>

    </div>
  );
}

export default ContactUs;

