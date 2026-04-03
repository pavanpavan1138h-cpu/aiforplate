import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-darkBg transition-colors duration-300 py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-12 pb-10">

                {/* header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primaryGreen to-accentOrange inline-block">
                        About AI for Plate
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto">
                        Feeding Bengaluru, Engineering Hope. We are building India&apos;s most intelligent food redistribution network natively out of Karnataka.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 space-y-4"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Core Mission</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Food waste in urban hubs like Bangalore is incredibly prevalent due to mass events and restaurant surplus. Meanwhile, countless local communities lack daily necessities. 
                            <strong> AI for Plate </strong> operates an algorithmic bridge connecting these two domains. We intercept perfectly viable food before it reaches a landfill, computing exact driver routes and notifying active NGOs seconds after a donation is registered.
                        </p>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 bg-gradient-to-br from-primaryGreen/5 to-accentOrange/5 space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Contact & Support</h2>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                            <li className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-primaryGreen text-xl" />
                                <span>Koramangala, Bangalore, Karnataka 560034</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaEnvelope className="text-primaryGreen text-xl" />
                                <span>support@aiforplate.in</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <FaPhone className="text-primaryGreen text-xl" />
                                <span>+91 98765 43210</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default About;
