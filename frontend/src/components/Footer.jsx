import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold text-primaryGreen mb-2">AI for Plate</h3>
                        <p className="text-gray-400 text-sm">Reducing food waste, one plate at a time.</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link to="/about" className="text-gray-400 hover:text-white transition">About & Contact</Link>
                        <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} AI for Plate. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
