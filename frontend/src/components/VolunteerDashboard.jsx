import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaMapMarkerAlt, FaClock, FaBoxOpen, FaClipboardCheck, FaExclamationCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const VolunteerDashboard = () => {
    const { user } = useAuth();
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeDelivery, setActiveDelivery] = useState(null);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/donations');
                setDeliveries(response.data.filter(d => d.status === 'available'));
            } catch (error) {
                console.error("Error fetching available deliveries", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    const handleAcceptDelivery = async (donation) => {
        // Simulated API call success
        setActiveDelivery(donation);
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primaryGreen border-t-transparent animate-spin rounded-full mb-4"></div>
            <p className="text-gray-500 font-bold dark:text-gray-400">Finding available tasks nearby...</p>
        </div>
    );

    return (
        <div className="space-y-8">
            {activeDelivery ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card shadow-2xl p-8 overflow-hidden relative"
                >
                    <div className="absolute top-0 inset-x-0 h-1 flex">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '45%' }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="bg-primaryGreen"
                        ></motion.div>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="bg-primaryGreen/20 text-primaryGreen px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-primaryGreen/30 animate-pulse">Live Mission</span>
                            <h2 className="text-3xl font-black text-gray-800 dark:text-white mt-4 tracking-tight">Active Delivery</h2>
                        </div>
                        <button 
                            onClick={() => {
                                setDeliveries(prev => prev.filter(d => d._id !== activeDelivery._id));
                                setActiveDelivery(null);
                            }}
                            className="glass-button !bg-red-500/10 text-red-500 hover:text-white hover:!bg-red-500 border-none transition-colors"
                        >
                            Complete Delivery
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6 flex flex-col justify-center">
                            <div className="glass p-6 rounded-2xl flex items-start space-x-4 border-l-4 border-l-primaryGreen">
                                <div className="p-3 bg-primaryGreen/20 text-primaryGreen rounded-xl text-xl flex-shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Pickup Route</p>
                                    <p className="font-bold text-gray-800 dark:text-gray-100 text-lg leading-tight">{activeDelivery.pickupLocation?.address || 'Detecting Location...'}</p>
                                    <p className="text-sm font-semibold text-primaryGreen mt-2">1.2 km away • 4 mins driving</p>
                                </div>
                            </div>
                            <div className="ml-8 border-l-2 border-dashed border-gray-300 dark:border-gray-600 h-8"></div>
                            <div className="glass p-6 rounded-2xl flex items-start space-x-4 border-l-4 border-l-blue-500">
                                <div className="p-3 bg-blue-500/20 text-blue-500 rounded-xl text-xl flex-shrink-0">
                                    <FaBoxOpen />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Package Details</p>
                                    <p className="font-bold text-gray-800 dark:text-gray-100 text-lg leading-tight">{activeDelivery.foodType}</p>
                                    <p className="text-sm font-semibold text-blue-500 mt-2">Quantity: {activeDelivery.quantity}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl min-h-[300px] flex items-center justify-center relative overflow-hidden group shadow-inner">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="z-10 flex flex-col items-center justify-center p-6 text-center h-full">
                                <div className="w-20 h-20 bg-primaryGreen/20 text-primaryGreen rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                                    <FaMapMarkerAlt className="animate-bounce" />
                                </div>
                                <h3 className="text-xl font-black text-gray-800 dark:text-white">Route Visualizer</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-2 max-w-xs">GPS navigation to pickup and dropoff is active. Drive safely!</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">Available Tasks</h2>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Be a hero today. Pick up and deliver food to those in need.</p>
                </div>
                <div className="flex items-center space-x-2 bg-primaryGreen/10 text-primaryGreen px-4 py-2 rounded-full border border-primaryGreen/20">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryGreen opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primaryGreen"></span>
                    </span>
                    <span className="font-bold text-sm tracking-wide uppercase">{deliveries.length} Active Missions</span>
                </div>
            </div>

            {deliveries.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-12 text-center"
                >
                    <div className="bg-gray-100 dark:bg-gray-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl text-gray-400">
                        <FaClipboardCheck />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">All tasks completed!</h3>
                    <p className="text-gray-500 dark:text-gray-400">You've cleared the queue. Check back in a few minutes for new donations.</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {deliveries.map((donation, index) => (
                            <motion.div
                                key={donation._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card group overflow-hidden flex flex-col hover:border-primaryGreen/50 transition-colors"
                            >
                                <div className="bg-gradient-to-r from-primaryGreen to-primaryGreen-dark px-5 py-4 flex justify-between items-center text-white">
                                    <h3 className="font-black truncate mr-4">{donation.foodType}</h3>
                                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest outline outline-1 outline-white/30">
                                        New
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm italic mb-6 line-clamp-2">
                                        "{donation.description || 'No description provided.'}"
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-start group/loc">
                                            <div className="p-2 bg-red-500/10 text-red-500 rounded-lg group-hover/loc:bg-red-500 group-hover/loc:text-white transition-colors mr-3 mt-1">
                                                <FaMapMarkerAlt />
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Pickup From</p>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{donation.pickupLocation?.address}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start group/qty">
                                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg group-hover/qty:bg-blue-500 group-hover/qty:text-white transition-colors mr-3 mt-1">
                                                <FaBoxOpen />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Quantity</p>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{donation.quantity}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start group/time">
                                            <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg group-hover/time:bg-orange-500 group-hover/time:text-white transition-colors mr-3 mt-1">
                                                <FaClock />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Expiries In</p>
                                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                                    {new Date(donation.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAcceptDelivery(donation)}
                                        className="mt-auto glass-button group/btn flex items-center justify-center space-x-2 overflow-hidden"
                                    >
                                        <span className="relative z-10">Accept Mission</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
            </>
            )}
        </div>
    );
};

export default VolunteerDashboard;
