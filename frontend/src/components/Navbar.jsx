import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationPanel from './NotificationPanel';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        // Initialize theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-2 shadow-lg' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center text-primaryGreen dark:text-green-400 text-2xl font-black tracking-tighter hover:scale-105 transition-transform">
                            <FaLeaf className="mr-2 animate-bounce-slow" />
                            AI FOR PLATE
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/map" className="text-gray-700 dark:text-gray-200 hover:text-primaryGreen dark:hover:text-green-400 font-semibold transition-colors">Map</Link>
                        <Link to="/community" className="text-gray-700 dark:text-gray-200 hover:text-primaryGreen dark:hover:text-green-400 font-semibold transition-colors">Community</Link>

                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-primaryGreen dark:hover:text-green-400 font-semibold transition-colors">Dashboard</Link>
                                <div className="flex items-center space-x-4 ml-6 border-l border-gray-200 dark:border-gray-700 pl-6">
                                    <button
                                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                                    >
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900 animate-pulse"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </button>
                                    <NotificationPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
                                    <button
                                        onClick={toggleDarkMode}
                                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                                    >
                                        {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-bold transition shadow-md hover:shadow-lg active:scale-95"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-primaryGreen dark:hover:text-green-400 font-semibold transition-colors">Login</Link>
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                                >
                                    {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
                                </button>
                                <Link to="/register" className="glass-button !w-auto">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden space-x-4">
                        {user && (
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                            >
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900 animate-pulse"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                        )}
                        <button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
                        >
                            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
                        >
                            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/20 dark:border-gray-800"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 block px-3 py-3 rounded-xl font-semibold bg-white/50 dark:bg-white/5" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                    <Link to="/map" className="text-gray-700 dark:text-gray-200 block px-3 py-3 rounded-xl font-semibold bg-white/50 dark:bg-white/5" onClick={() => setIsOpen(false)}>Map</Link>
                                    <Link to="/community" className="text-gray-700 dark:text-gray-200 block px-3 py-3 rounded-xl font-semibold bg-white/50 dark:bg-white/5" onClick={() => setIsOpen(false)}>Community</Link>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="w-full text-center text-white bg-red-500 hover:bg-red-600 px-3 py-3 rounded-xl font-bold mt-4 shadow-md active:scale-95 transition-all"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/map" className="text-gray-700 dark:text-gray-200 block px-3 py-3 rounded-xl font-semibold bg-white/50 dark:bg-white/5" onClick={() => setIsOpen(false)}>Map</Link>
                                    <Link to="/community" className="text-gray-700 dark:text-gray-200 block px-3 py-3 rounded-xl font-semibold bg-white/50 dark:bg-white/5" onClick={() => setIsOpen(false)}>Community</Link>
                                    <Link to="/login" className="text-gray-700 dark:text-gray-200 block px-3 py-3 rounded-xl font-semibold bg-white/50 dark:bg-white/5" onClick={() => setIsOpen(false)}>Login</Link>
                                    <Link to="/register" className="glass-button block mt-4" onClick={() => setIsOpen(false)}>Sign Up</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
