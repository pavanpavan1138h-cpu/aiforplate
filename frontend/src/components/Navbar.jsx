import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaLeaf, FaBars } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-primary-green shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center text-white text-2xl font-bold">
                            <FaLeaf className="mr-2 text-white" />
                            AI for Plate
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-white hover:bg-green-600 px-3 py-2 rounded-md font-medium">Dashboard</Link>
                                {['volunteer', 'admin'].includes(user.role) && (
                                    <Link to="/map" className="text-white hover:bg-green-600 px-3 py-2 rounded-md font-medium">Map</Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium ml-4 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:bg-green-600 px-3 py-2 rounded-md font-medium">Login</Link>
                                <Link to="/register" className="bg-white text-primary-green hover:bg-gray-100 px-4 py-2 rounded-md font-bold ml-4 transition">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none"
                        >
                            <FaBars className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-white block px-3 py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                {['volunteer', 'admin'].includes(user.role) && (
                                    <Link to="/map" className="text-white block px-3 py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>Map</Link>
                                )}
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full text-left text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md font-medium mt-2"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white block px-3 py-2 rounded-md font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" className="text-white bg-green-600 block px-3 py-2 rounded-md font-bold mt-2" onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
