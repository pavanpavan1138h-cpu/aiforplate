import React from 'react';
import Leaderboard from '../components/Leaderboard';
import CommunityWall from '../components/CommunityWall';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaUsers, FaHandsHelping } from 'react-icons/fa';

const Community = () => {
    const stats = [
        { label: 'Active Savers', value: '12,450', icon: <FaUsers />, color: 'text-primaryGreen' },
        { label: 'Impact Stores', value: '450+', icon: <FaGlobeAmericas />, color: 'text-blue-500' },
        { label: 'Volunteers', value: '2,100', icon: <FaHandsHelping />, color: 'text-accentOrange' },
    ];

    return (
        <div className="container mx-auto px-4 pt-32 pb-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-black text-gray-800 dark:text-white mb-6 tracking-tight">
                    Together We Can <span className="text-primaryGreen">Save the Planet</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium text-lg italic">
                    "Every meal saved is a step towards a zero-waste world. Join the 20,000+ heroes redistributing hope."
                </p>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card p-6 flex items-center space-x-6"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-800 dark:text-white">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 order-2 lg:order-1">
                    <CommunityWall />
                </div>
                <div className="order-1 lg:order-2">
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
};

export default Community;
