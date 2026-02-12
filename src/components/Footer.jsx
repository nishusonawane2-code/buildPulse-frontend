import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Home as HomeIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0F172A] text-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <h2 className="text-3xl font-extrabold tracking-tight">
                                Built<span className="text-orange-500">&</span>Pulse
                            </h2>
                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            India's leading tech-enabled construction company, dedicated to building your dream home with 470+ quality checks and a 10-year structural warranty.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="p-2 bg-white/5 hover:bg-orange-500 rounded-xl transition-all"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-white/5 hover:bg-orange-500 rounded-xl transition-all"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-white/5 hover:bg-orange-500 rounded-xl transition-all"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-white/5 hover:bg-orange-500 rounded-xl transition-all"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold">Quick Navigation</h4>
                        <nav className="flex flex-col gap-4">
                            <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Home</Link>
                            <Link to="/projects" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Our Projects</Link>
                            <Link to="/floorplans" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Floor Plans</Link>
                            <Link to="/estimator" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Cost Estimator</Link>
                            <Link to="/contactus" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Contact Us</Link>
                        </nav>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold">Our Services</h4>
                        <nav className="flex flex-col gap-4">
                            <span className="text-gray-400 text-sm">Independent Houses</span>
                            <span className="text-gray-400 text-sm">Bungalow Construction</span>
                            <span className="text-gray-400 text-sm">Villa Construction</span>
                            <span className="text-gray-400 text-sm">Farmhouse Construction</span>
                            <span className="text-gray-400 text-sm">Duplex Homes</span>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold">Get In Touch</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
                                <p className="text-gray-400 text-sm">Built & Pulse, Malegaon, Nashik , Maharashtra, India</p>
                            </div>
                            <a href="tel:+919511756100" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                <Phone className="w-5 h-5 text-orange-500" />
                                <span className="text-sm">+91 9511756100</span>
                            </a>
                            <a href="mailto:contact@builtpulse.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                <Mail className="w-5 h-5 text-orange-500" />
                                <span className="text-sm">contact@builtpulse.com</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Built & Pulse Construction. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs text-gray-500">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
