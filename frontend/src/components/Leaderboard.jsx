import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaStar, FaTrophy, FaMedal } from 'react-icons/fa';

const Leaderboard = () => {
    const topSavers = [
        { id: 1, name: 'Eco Kitchen SF', points: 4500, saves: 120, badge: 'Diamond Saver' },
        { id: 2, name: 'The Food Bank', points: 3850, saves: 98, badge: 'Gold Hero' },
        { id: 3, name: 'Green Garden Cafe', points: 3200, saves: 85, badge: 'Gold Hero' },
        { id: 4, name: 'John Doe (Volunteer)', points: 2900, saves: 112, badge: 'Silver Partner' },
        { id: 5, name: 'Urban Shelter Inc', points: 2400, saves: 64, badge: 'Silver Partner' },
    ];

    return (
        <div className="glass-card p-8">
            <div className="flex items-center space-x-4 mb-10">
                <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-2xl flex items-center justify-center text-2xl">
                    <FaTrophy />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-800 dark:text-white">Impact Leaderboard</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Top contributors saving food this month.</p>
                </div>
            </div>

            <div className="space-y-4">
                {topSavers.map((user, index) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-5 rounded-2xl flex items-center justify-between group transition-all duration-300 ${index === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-gray-100/50 dark:bg-gray-800/50 border border-transparent hover:border-gray-300 dark:hover:border-gray-700'
                            }`}
                    >
                        <div className="flex items-center space-x-5">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${index === 0 ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/30' :
                                    index === 1 ? 'bg-gray-300 text-gray-700' :
                                        index === 2 ? 'bg-orange-300 text-orange-800' :
                                            'bg-gray-200 dark:bg-gray-700 text-gray-500'
                                }`}>
                                {index === 0 ? <FaCrown /> : index + 1}
                            </div>
                            <div>
                                <h4 className="font-extrabold text-gray-800 dark:text-white truncate max-w-[150px]">{user.name}</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primaryGreen">{user.badge}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-lg font-black text-gray-800 dark:text-white">{user.points.toLocaleString()}</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Points earned</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className="w-full mt-10 h-14 glass-button !bg-gray-100 dark:!bg-gray-800 text-gray-800 dark:text-white border-transparent hover:!bg-primaryGreen hover:!text-white transition-all">
                VIEW FULL RANKINGS
            </button>
        </div>
    );
};

export default Leaderboard;
