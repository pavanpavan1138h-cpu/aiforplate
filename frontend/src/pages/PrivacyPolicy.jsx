import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-darkBg transition-colors duration-300 py-16 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto glass-card p-8 md:p-12"
            >
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 border-b pb-4 dark:border-gray-700">Privacy & Policy</h1>
                
                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">1. Information Collection</h2>
                        <p>We collect essential information purely for the algorithmic coordination of food mapping. 
                        This includes Name, Entity Roles (NGO, Restaurant, Volunteer), and live GPS or static coordinate inputs when declaring a food handoff in Karnataka and surrounding domains.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">2. Usage of Data</h2>
                        <p>Your geographic data is actively shared on an encrypted mapping pipeline strictly connected to verified NGO receivers and internal volunteer riders. <strong>AI for Plate firmly guarantees we do not sell your personal behavior logs to third-party marketing frameworks.</strong></p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">3. AI Mapping System</h2>
                        <p>We process donation timestamps, weights, and transit distances to construct aggregate metadata (visible on our site counters). Individual locations resolve entirely within temporary sessions.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">4. Modifications</h2>
                        <p>Our platform functionality operates rapidly. Policies may update as AI for Plate scales heavily out of Bangalore. Continued usage signifies agreement with our regional terms.</p>
                    </section>
                </div>
                
                <div className="mt-12 text-sm text-gray-500 text-center">
                    Last Updated: March 2026. For questions, visit the About & Contact page.
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
