import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    { id: 1, title: 'Donor Uploads Food', icon: '🍲', desc: 'Restaurants or households post surplus food details.' },
    { id: 2, title: 'AI Matching', icon: '🧠', desc: 'Our smart algorithm instantly finds the nearest active receiver.' },
    { id: 3, title: 'Volunteer Dispatched', icon: '🚲', desc: 'A nearby volunteer is alerted with optimal routing.' },
    { id: 4, title: 'Food Delivered', icon: '💖', desc: 'Food reaches the NGO, preventing waste and feeding people.' }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const FlowDiagram = () => {
    return (
        <div className="py-20 bg-gray-50 dark:bg-darkBg transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primaryGreen to-accentOrange inline-block mb-4">
                        How AI for Plate Works
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        A seamless, technology-driven flow that ensures maximum efficiency in food redistribution.
                    </p>
                </div>

                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Connecting Line for Desktop */}
                    <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-primaryGreen via-accentOrange to-primaryGreen opacity-30 z-0"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4 mb-10 md:mb-0 px-4"
                            variants={itemVariants}
                        >
                            <div className="w-24 h-24 rounded-full glass flex items-center justify-center text-4xl shadow-xl mb-6 bg-white dark:bg-darkCard border-2 border-primaryGreen/20 relative">
                                {/* Number Badge */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accentOrange text-white flex items-center justify-center font-bold shadow-md">
                                    {step.id}
                                </div>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>

                            {/* Arrow for Mobile only */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden mt-8 text-primaryGreen/50 text-2xl animate-bounce">
                                    ↓
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default FlowDiagram;
