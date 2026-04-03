import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';

const UrgentAlerts = ({ alerts = [] }) => {
    // Mocking alerts if none provided for demonstration
    const demoAlerts = alerts.length > 0 ? alerts : [
        {
            id: 'a1',
            title: 'Immediate Food Needed',
            location: 'Central Community Kitchen',
            time: 'Expired in 45m',
            type: 'urgent'
        }
    ];

    return (
        <div className="space-y-4 mb-8">
            <AnimatePresence>
                {demoAlerts.map((alert, idx) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                        <div className="relative glass-card border-l-4 border-l-red-500 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center text-xl shrink-0">
                                    <FaExclamationTriangle className="animate-pulse" />
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start space-x-2 mb-1">
                                        <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Urgent Alert</span>
                                        <h4 className="text-lg font-black text-gray-800 dark:text-white leading-tight">{alert.title}</h4>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-gray-500">
                                        <span className="flex items-center"><FaMapMarkerAlt className="mr-1 text-red-400" /> {alert.location}</span>
                                        <span className="flex items-center"><FaClock className="mr-1 text-orange-400" /> {alert.time}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="glass-button !bg-red-500 !text-white border-none py-3 !px-8 text-sm !w-full md:!w-auto flex items-center justify-center space-x-2 group-hover:translate-x-1 transition-transform">
                                <span>Respond Now</span>
                                <FaArrowRight />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default UrgentAlerts;
