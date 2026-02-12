import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>

            {/* Header */}
            <header className="backdrop-filter backdrop-blur-lg shadow-lg px-8 py-3 flex justify-between items-center fixed w-screen z-50">
                <Link to={"/"}>
                    <h1 className="text-xl font-bold text-gray-900">
                        Built<span className="text-orange-500">Pulse</span>
                    </h1>

                </Link>

                <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
                    {/* Correct Routes */}
                    <Link
                        to="/projects"
                        className="hover:text-orange-500 transition-colors duration-200"
                    >
                        Projects
                    </Link>

                    <Link
                        to="/floorplans"
                        className="hover:text-orange-500 transition-colors duration-200"
                    >
                        Floor Plans
                    </Link>

                    <Link
                        to="/estimator"
                        className="hover:text-orange-500 transition-colors duration-200"
                    >
                        Estimator
                    </Link>

                    <Link
                        to="/contactus"
                        className="hover:text-orange-500 transition-colors duration-200"
                    >
                        Contact Us
                    </Link>

                </nav>

                <div className="flex items-center gap-4">
                    <a
                        href="tel:+919511756100"
                        className="font-semibold hover:text-gray-300"
                    >
                        📞 +91 9511756100
                    </a>

                    <Link to="/login" className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-2 rounded-md">
                        Let’s Build
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Navbar
