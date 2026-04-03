import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-darkBg transition-colors duration-300">

            {/* Background Animated Blobs */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-primaryGreen rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-accentOrange rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:bg-blue-900 dark:opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primaryGreen to-accentOrange mb-6">
                            Smart Food Redistribution
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
                            Join the AI-powered network connecting surplus food with communities in need. Reduce waste, feed hope.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Link to="/register" className="glass-button text-lg w-full sm:w-auto">
                            Donate Food
                        </Link>
                        <Link to="/register" className="glass-button-outline text-lg w-full sm:w-auto">
                            Request Food
                        </Link>
                        <Link to="/register" className="text-primaryGreen hover:text-primaryGreen-dark dark:text-green-400 font-semibold underline underline-offset-4 w-full sm:w-auto mt-4 sm:mt-0 transition-colors">
                            Join as Volunteer
                        </Link>
                    </motion.div>

                    {/* Impact Counters (Stats) */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {[
                            { label: 'Meals Saved', value: '12,450+', color: 'text-primaryGreen' },
                            { label: 'CO2 Reduced (kg)', value: '8,320', color: 'text-blue-500' },
                            { label: 'Active Donors', value: '342', color: 'text-accentOrange' },
                            { label: 'Communities Served', value: '89', color: 'text-purple-500' }
                        ].map((stat, index) => (
                            <div key={index} className="glass-card p-6 text-center transform hover:-translate-y-2 transition-transform duration-300">
                                <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</h3>
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;
