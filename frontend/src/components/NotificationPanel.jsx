import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const NotificationPanel = ({ isOpen, onClose }) => {
    const notifications = [
        {
            id: 1,
            type: 'success',
            title: 'Donation Accepted',
            message: 'Your donation of "Cooked Rice & Dal" has been picked up by volunteer John.',
            time: '2 mins ago',
            read: false
        },
        {
            id: 2,
            type: 'urgent',
            title: 'Urgent Request Nearby',
            message: 'A local shelter needs food for 20 people in the next 2 hours.',
            time: '15 mins ago',
            read: false
        },
        {
            id: 3,
            type: 'info',
            title: 'Community Milestone',
            message: 'The SF community just reached 5,000 meals saved! 🎉',
            time: '1 hour ago',
            read: true
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[60]" onClick={onClose}></div>
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="fixed top-20 right-4 md:right-8 w-[calc(100vw-32px)] md:w-96 glass-card shadow-2xl z-[70] overflow-hidden"
                    >
                        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <FaBell className="text-primaryGreen" />
                                <h3 className="font-black text-gray-800 dark:text-white uppercase tracking-tight">Notifications</h3>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <FaTimes />
                            </button>
                        </div>

                        <div className="max-h-[70vh] overflow-y-auto">
                            {notifications.length > 0 ? (
                                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            className={`p-5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors cursor-pointer group ${!n.read ? 'bg-primaryGreen/5' : ''}`}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${n.type === 'success' ? 'bg-green-100 text-green-500' :
                                                        n.type === 'urgent' ? 'bg-red-100 text-red-500 animate-pulse' :
                                                            'bg-blue-100 text-blue-500'
                                                    }`}>
                                                    {n.type === 'success' ? <FaCheckCircle /> :
                                                        n.type === 'urgent' ? <FaExclamationCircle /> :
                                                            <FaInfoCircle />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="text-sm font-black text-gray-800 dark:text-white">{n.title}</h4>
                                                        <span className="text-[10px] font-bold text-gray-400">{n.time}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                                        {n.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 text-center">
                                    <p className="text-gray-400 font-bold italic">No notifications yet.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 text-center">
                            <button className="text-xs font-black text-primaryGreen uppercase tracking-widest hover:underline">
                                Mark all as read
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default NotificationPanel;
