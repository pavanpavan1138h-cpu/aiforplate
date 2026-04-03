import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedCounter = ({ value, label, color }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.replace(/,/g, '').replace('+', ''));
    const suffix = value.includes('+') ? '+' : '';
    
    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = numericValue / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= numericValue) {
                setCount(numericValue);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [numericValue]);

    return (
        <div className="glass-card p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
            <div className={`absolute -inset-1 opacity-0 group-hover:opacity-10 blur-xl transition duration-500 bg-current ${color}`}></div>
            <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${color} relative z-10`}>
                {count.toLocaleString()}{suffix}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider relative z-10">{label}</p>
        </div>
    );
};

const HeroSection = () => {
    return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-darkBg transition-colors duration-300">

            {/* Background Animated Blobs */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-primaryGreen rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:opacity-30"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-accentOrange rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:opacity-30"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:bg-blue-900 dark:opacity-30"></div>
            </div>

            {/* Floating Food Icons */}
            <div className="absolute top-20 left-10 text-5xl animate-float opacity-80 pointer-events-none dark:opacity-60 hidden md:block z-0">🍔</div>
            <div className="absolute bottom-40 left-1/4 text-4xl animate-float-delayed opacity-80 pointer-events-none dark:opacity-60 hidden md:block z-0">🥦</div>
            <div className="absolute top-32 right-20 text-6xl animate-float opacity-80 pointer-events-none dark:opacity-60 hidden md:block z-0">🍲</div>
            <div className="absolute bottom-20 right-1/3 text-4xl animate-float-delayed opacity-80 pointer-events-none dark:opacity-60 hidden md:block z-0">🥪</div>

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
                            <AnimatedCounter key={index} value={stat.value} label={stat.label} color={stat.color} />
                        ))}
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;
