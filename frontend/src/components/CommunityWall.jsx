import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShareAlt, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';

const CommunityWall = () => {
    const posts = [
        {
            id: 1,
            user: 'Cafe Momentum',
            role: 'Donor',
            location: 'San Francisco, CA',
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
            content: 'Just donated 50 trays of hot meals from our evening event. Happy to see it going to the local shelter!',
            likes: 124,
            time: '2h ago'
        },
        {
            id: 2,
            user: 'Helping Hands NGO',
            role: 'Receiver',
            location: 'Oakland, CA',
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400',
            content: 'Received a massive donation of fresh bread and veggies. Our community is so grateful!',
            likes: 89,
            time: '5h ago'
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Community Wall</h2>
                <button className="text-primaryGreen font-bold text-sm bg-primaryGreen/10 px-4 py-2 rounded-full hover:bg-primaryGreen/20 transition-colors">
                    Post Update
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="glass-card group overflow-hidden"
                    >
                        <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primaryGreen/20 overflow-hidden flex items-center justify-center text-primaryGreen font-black">
                                    {post.user.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-gray-800 dark:text-white">{post.user}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{post.role} • {post.time}</p>
                                </div>
                            </div>
                            <div className="text-gray-400 flex items-center space-x-1">
                                <FaMapMarkerAlt className="text-[10px]" />
                                <span className="text-[10px] font-black uppercase tracking-tighter">{post.location}</span>
                            </div>
                        </div>

                        <div className="aspect-video w-full overflow-hidden">
                            <img
                                src={post.image}
                                alt="Donation"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                        </div>

                        <div className="p-6">
                            <div className="relative mb-6">
                                <FaQuoteLeft className="absolute -top-4 -left-2 text-primaryGreen/10 text-4xl" />
                                <p className="text-gray-600 dark:text-gray-300 font-medium italic relative z-10">
                                    {post.content}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center space-x-6">
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                                        <FaHeart />
                                        <span className="text-xs font-black">{post.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-primaryGreen transition-colors">
                                        <FaShareAlt />
                                        <span className="text-xs font-black">Share</span>
                                    </button>
                                </div>
                                <span className="text-[10px] font-black text-primaryGreen uppercase tracking-widest bg-primaryGreen/10 px-3 py-1 rounded-full">
                                    Verified Impact
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CommunityWall;
